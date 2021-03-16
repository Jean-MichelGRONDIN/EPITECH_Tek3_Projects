import React from 'react';

import AuthPages from './Pages/AuthPages'
import MainRouter from './Routers/MainRouter';
import LoadingPage from './Pages/LoadingPage';

class AuthManagers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("areausertoken"),
            verified: false,
            clientsids: []
        }
    }
    badAuthManagement() {
        localStorage.removeItem("areausertoken");
        window.location.reload();
    }
    handleCheckRes(data) {
        if (data.type === "ok") {
            this.setState({verified: true});
        } else {
            this.badAuthManagement();
        }
    }
    componentDidMount() {
        if (this.state.token !== null) {
            fetch("http://localhost:8080/users/checktoken", {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + this.state.token}
            }).then(res => res.json()).then(data => this.handleCheckRes(data))
            .catch(err => this.badAuthManagement());
        }
        fetch("http://localhost:8080/serviceskeys", {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + this.state.token}
            }).then(res => res.json()).then(data => this.setState({ clientsids: data}))
            .catch(err => console.log("An error happenned can't access services"));
    }
    render () {
        if (this.state.clientsids.length === 0) {
            return (<LoadingPage />)
        }
        if (this.state.verified === false) {
            return (
                <AuthPages clientsids={this.state.clientsids} />
            );
        } else {
            return (
                <MainRouter clientsids={this.state.clientsids} token={this.state.token}/>
            );
        }
    }
}

export default AuthManagers;