import React from 'react';
import {
        BrowserRouter as Router,
        Switch,
        Route
    } from "react-router-dom";

import HomePAge from '../Pages/HomePage';
import ServicePage from '../Pages/ServicePage';
import AboutJsonPage from '../Pages/AboutJSON';
import LoadingPage from '../Pages/LoadingPage';
import ProfilePage from '../Pages/ProfilePage';
import AuthServicesPage from '../Pages/AuthServicesPage'

class ClientAPK extends React.Component {
    componentDidMount() {
        window.location.replace("http://localhost:8080/apk_volume/area.apk");
    }
    render() {
        return (
            <div>
                <h2>The download should start automatically. Click below if not</h2>
                <a href="http://localhost:8080/apk_volume/area.apk">Click here to download the apk</a>
            </ div>
        );
    }
}

class MainRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            userinfos: []
        }
    }
    getInfos() {
        fetch("http://localhost:8080/users/servicesActReactList", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.props.token}
        }).then(res => res.json()).then(data => this.setState({ services: data}))
        .catch(err => console.log("An error happenned can't access services"));
        fetch("http://localhost:8080/users/getUserInfos", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.props.token}
        }).then(res => res.json()).then(data => this.setState({ userinfos: data}))
        .catch(err => console.log("An error happenned can't access userInfos"));
    }
    componentDidMount() {
        this.getInfos();
    }
    render () {
        if (this.state.services.length === 0 || this.state.userinfos.length === 0) {
            return (<LoadingPage />)
        }
        return (
        <Router>
            <Switch>
                <Route path="/client.apk">
                    <ClientAPK />
                </Route>
                <Route path="/authentication">
                    <AuthServicesPage clientsids={this.props.clientsids} updateall={this.getInfos.bind(this)} userinfos={this.state.userinfos} services={this.state.services} token={this.props.token} />
                </Route>
                <Route path="/service">
                    <ServicePage clientsids={this.props.clientsids} updateall={this.getInfos.bind(this)} userinfos={this.state.userinfos} services={this.state.services} token={this.props.token} />
                </Route>
                <Route path="/about.json">
                    <AboutJsonPage token={this.props.token} />
                </Route>
                <Route path="/profile">
                    <ProfilePage updateall={this.getInfos.bind(this)} userinfos={this.state.userinfos} services={this.state.services} token={this.props.token} />
                </Route>
                <Route path="/">
                    <HomePAge clientsids={this.props.clientsids} updateall={this.getInfos.bind(this)} userinfos={this.state.userinfos} services={this.state.services} token={this.props.token} />
                </Route>
            </Switch>
        </Router>
        );
    }
}

export default MainRouter;