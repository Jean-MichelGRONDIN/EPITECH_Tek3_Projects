import React from 'react';
import {
        BrowserRouter as Router,
        Switch,
        Route
    } from "react-router-dom";

import Dashboard from './pages/Dashboard';
import AboutJsonPage from './pages/AboutJsonPage';

class MainRoutesManager extends React.Component {
    render () {
        return (
        <Router>
            <Switch>
                <Route path="/about.json">
                    <AboutJsonPage token={this.props.token} />
                </Route>
                <Route path="/">
                    <Dashboard token={this.props.token} />
                </Route>
            </Switch>
        </Router>
        );
    }
}

export default MainRoutesManager;