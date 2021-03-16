import React from 'react';
import { StyleSheet } from "react-native";

import { NativeRouter, Route } from "react-router-native";

import HomePage from "../Pages/HomePage";
import ServicePage from "../Pages/ServicePage";
import ProfilePage from "../Pages/ProfilePage";
import LoadingPage from '../Pages/LoadingPage';

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        padding: 10
    },
    header: {
        fontSize: 20
    },
    nav: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    navItem: {
        flex: 1,
        alignItems: "center",
        padding: 10
    },
    subNavItem: {
        padding: 5
    },
    topic: {
        textAlign: "center",
        fontSize: 15
    }
});

class MainRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            userinfos: []
        }
    }
    getInfos() {
        fetch("http://"+ this.props.ip +":8080/users/servicesActReactList", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.props.token}
        }).then(res => res.json()).then(data => this.setState({ services: data}))
        .catch(err => console.log("An error happenned can't access services: ", err));
        fetch("http://"+ this.props.ip +":8080/users/getUserInfos", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.props.token}
        }).then(res => res.json()).then(data => this.setState({ userinfos: data}))
        .catch(err => console.log("An error happenned can't access userInfos: ", err));
    }
    componentDidMount() {
        if (this.props.token !== null) {
            this.getInfos();
        }
    }
    render () {
        const Home = () => <HomePage updateall={this.getInfos.bind(this)} ip={this.props.ip} clientsids={this.props.clientsids} token={this.props.token} userinfos={this.state.userinfos} services={this.state.services}/>;

        const Service = () => <ServicePage updateall={this.getInfos.bind(this)} ip={this.props.ip} clientsids={this.props.clientsids} token={this.props.token} userinfos={this.state.userinfos} services={this.state.services}/>;

        const Profile = () => <ProfilePage unSetToken={this.props.unSetToken} updateall={this.getInfos.bind(this)} ip={this.props.ip} clientsids={this.props.clientsids} token={this.props.token} userinfos={this.state.userinfos} services={this.state.services}/>;
        if (this.state.services.length === 0 || this.state.userinfos.length === 0) {
            return (<LoadingPage />);
        }
        return (
        <NativeRouter>
                <Route exact path="/" component={Home} />
                <Route path="/service" component={Service} />
                <Route path="/profile" component={Profile} />
        </NativeRouter>
        );
    }
}

export default MainRouter;