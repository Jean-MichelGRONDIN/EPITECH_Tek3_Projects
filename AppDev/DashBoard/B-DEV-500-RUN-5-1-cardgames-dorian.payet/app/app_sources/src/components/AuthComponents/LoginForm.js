import React from 'react';

import MicrosoftLogin from "react-microsoft-login";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            msg: ""
        };
    }
    saveTokenAndReload(token) {
        localStorage.setItem("jmdashboardtoken", token);
        window.location.replace("/");
    }
    handleResponse(res) {
        if (res.type === "ok") {
            this.saveTokenAndReload(res.token);
        } else {
            this.setState({msg: "Log in failed"});
        }
    }
    fetchLogin() {
        fetch('http://localhost:3030/login', {
            method: 'post',
            body: 'username=' + this.state.username +'&password=' + this.state.password,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        })
        .then(res => res.json())
        .then(data => this.handleResponse(data))
        .catch(err => console.log("Error on fetching to login: ", err));
    }
    authHandlerResponse(res) {
        if (res.type === "ok") {
            this.saveTokenAndReload(res.token);
        } else {
            this.setState({msg: "Login failed in the backend"});
        }
    }
    authHandler(err, data) {
        if (err) {
            this.setState({msg: "Log in failed"});
            return;
        }
        fetch('http://localhost:3030/thirdpartyLogin', {
            method: 'post',
            body: 'username=' + data.account.name +'&email=' + data.account.userName +'&password=' + data.account.accountIdentifier,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        })
        .then(res => res.json())
        .then(data => this.authHandlerResponse(data))
        .catch(err => console.log("Error on fetching to login thirdparty: ", err));
    };
    render() {
        var msg = [];
        if (this.state.msg !== "") {
            msg.push(<h4 className="infoBox" key={1} name="authInfos" id="authInfos" >{this.state.msg}</h4>);
        }
        return (
            <div className="authContainer" >
                <h1 className="colorWhite" key={0} name="authTitle" id="authTitle">Please log in to access the platform</h1>
                {msg}
                <div className="form-group">
                    <label className="colorWhite" htmlFor="authUsername">Username:</label>
                    <input className="form-control" type="text" placeholder="Username" name="authUsername" id="authUsername" onChange={(e) => this.setState({ username: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label className="colorWhite" htmlFor="authPassword">Password:</label>
                    <input className="form-control" placeholder="Password" type="password" name="authPassword" id="authPassword" onChange={(e) => this.setState({ password: e.target.value})}/>
                </div>
                <button className="btn colorbouton colorWhite" name="authSubmitButton" id="authSubmitButton" onClick={() => this.fetchLogin()}>Log in</button>
                <MicrosoftLogin key={2} clientId={"$MY_CLIENT_ID"} authCallback={this.authHandler.bind(this)} />
                <div>
                    <label className="colorWhite paddingRigthTwo" htmlFor="authSwitchPage">Don't have an account ?</label>
                    <button className="btn colorbouton colorWhite" name="authSwitchPage" id="authSwitchPage" onClick={() => this.props.changeForm("register")}>Register now</button>
                </div>
            </div>
        );
    }
}

export default LoginForm;