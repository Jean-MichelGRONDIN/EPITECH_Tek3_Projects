import React from 'react';
import AuthPages from './Pages/AuthPages'
import MainRouter from './Routers/MainRouter';
import LoadingPage from './Pages/LoadingPage';

class AuthManagers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            verified: false,
            clientsids: []
        }
    }
    badAuthManagement() {
        this.setState({ token: null, verified: false});
    }
    handleCheckRes(data) {
        if (data.type === "ok") {
            this.setState({verified: true});
        } else {
            this.badAuthManagement();
        }
    }
    handleCheckResMobile(data, newtoken) {
        if (data.type === "ok") {
            this.setState({verified: true, token: newtoken});
        } else {
            this.badAuthManagement();
        }
    }
    componentDidMount() {
        if (this.state.token !== null) {
            fetch("http://"+ this.props.ip +":8080/users/checktoken", {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + this.state.token}
            }).then(res => res.json()).then(data => this.handleCheckRes(data))
            .catch(err => this.badAuthManagement());
        }
        fetch("http://"+ this.props.ip +":8080/serviceskeys", {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + this.state.token}
            }).then(res => res.json()).then(data => this.setState({ clientsids: data}))
            .catch(err => console.log("An error happenned can't access services"));
    }
    setToken(newtoken) {
        fetch("http://"+ this.props.ip +":8080/users/checktoken", {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + newtoken}
        }).then(res => res.json()).then(data => this.handleCheckResMobile(data, newtoken))
        .catch(err => this.badAuthManagement());
    }
    unSetToken() {
        this.setState({ token: null, verified: false });
    }
    render () {
        if (this.state.clientsids.length === 0) {
            return (<LoadingPage />)
        }
        if (this.state.verified === false) {
            return (
                <AuthPages ip={this.props.ip} clientsids={this.state.clientsids} setToken={this.setToken.bind(this)} />
            );
        } else {
            return (
                <MainRouter ip={this.props.ip} clientsids={this.state.clientsids} token={this.state.token} unSetToken={this.unSetToken.bind(this)} />
            );
        }
    }
}

export default AuthManagers;