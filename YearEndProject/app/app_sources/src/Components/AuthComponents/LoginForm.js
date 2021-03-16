import React from 'react';

import MicrosoftLogin from "react-microsoft-login";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            msg: "",
            microsoftclientID: ""
        };
    }
    saveTokenAndReload(token) {
        localStorage.setItem("areausertoken", token);
        window.location.reload();
    }
    handleResponse(res) {
        if (res.type === "ok") {
            this.saveTokenAndReload(res.token);
        } else {
            this.setState({msg: "Log in failed"});
        }
    }
    fetchLogin() {
        fetch('http://localhost:8080/login', {
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
            this.setState({msg: "Microsoft log in failed"});
            return;
        }
        fetch('http://localhost:8080/thirdpartyLogin', {
            method: 'post',
            body: 'username=' + data.account.name + '&firstname=MicrosoftAuth2&lastname=MicrosoftAuth2&email=' + data.account.userName + '&password=' + data.account.accountIdentifier,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        })
        .then(res => res.json())
        .then(data => this.authHandlerResponse(data))
        .catch(err => console.log("Error on fetching to login thirdparty: ", err));
    };
    componentDidMount() {
        var tmp = this.props.clientsids;
        tmp.forEach(elem => {
            var tmpObj = elem;
            if (tmpObj.servicename === "Microsoft") {
                this.setState({microsoftclientID: tmpObj.clientid})
            }
        });
    }
    render() {
        var msg = [];
        var Microsoft = [];
        if (this.state.msg !== "") {
            msg.push(<h4 key={1} id="authInfos" >{this.state.msg}</h4>);
        }
        if (this.state.microsoftclientID !== "") {
            Microsoft.push(
                <MicrosoftLogin key={2}
                    clientId={this.state.microsoftclientID}
                    authCallback={this.authHandler.bind(this)}
                />)
        }
        return (
            <div className="auth_block" >
                <h1 className="text_blue" key={0} id="authTitle">Sign in</h1>
                {msg}
                <div className="microsoft_block" >
                    {Microsoft}
                </div>
                <div className="input_block" >
                    <label htmlFor="authUsername">Username</label>
                    <input type="text" id="authUsername" onChange={(e) => this.setState({ username: e.target.value})}/>
                </div>
                <div className="input_block" >
                    <label htmlFor="authPassword">Password</label>
                    <input type="password" id="authPassword" onChange={(e) => this.setState({ password: e.target.value})}/>
                </div>
                <div className="button_block" >
                    <button className="auth_send_button" id="authSubmitButton" onClick={() => this.fetchLogin()}>Sign in</button>
                </div>
                <div className="button_block" >
                    <button className="auth_second_button" id="authSwitchPage" onClick={() => this.props.changeForm("register")}>Register</button>
                </div>
            </div>
        );
    }
}

export default LoginForm;