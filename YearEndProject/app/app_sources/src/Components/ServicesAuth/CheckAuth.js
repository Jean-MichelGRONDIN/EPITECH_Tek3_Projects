import React from 'react';

import MicrosoftLogin from "react-microsoft-login";
import SpotifyLogin from 'react-spotify-login';
import GoogleLogin from 'react-google-login';
import IntraAutologForm from './IntraAutologForm';

class CheckAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientID: "",
            microsoftclientID: "",
            spotifyclientID: "",
            googleclientID: "",
            msg: ""
        };
    }
    componentDidMount() {
        var tmp = this.props.clientsids;
        tmp.forEach(elem => {
            var tmpObj = elem;
            if (tmpObj.servicename === "Microsoft") {
                this.setState({microsoftclientID: tmpObj.clientid})
            }
        });
    }
    handleSaveActReac(data) {
        this.props.updateall();
    }
    onSuccess(response) {
        if (response != null) {
            console.log(response.access_token);
            var token = Object(response).access_token;
            var refreshToken = Object(response).refreshToken;
            fetch("http://localhost:8080/users/linknewaccount", {
            method: "POST",
            body: 'servicename=' + this.props.servicename + '&refreshtoken=' + refreshToken + '&accesstoken=' + token,
            headers: {
                    'Authorization': 'Bearer ' + this.props.token,
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).then(res => res.json())
            .then(data => this.handleSaveActReac(data))
            .catch(err => console.log("Error log in the service: ", err));
        } else {
            this.setState({msg: "Failed to login to Spotify"});
        }
    }
    onFailure(response) {
        this.setState({msg: "Error while trying to connect to Spotify"})
        console.log(response);
    }
    authHandler(err, data) {
        if (err) {
            this.setState({msg: "Log in failed"});
            return;
        }
        var token = Object(data).accessToken;
        var refreshToken = Object(data).refreshToken;
        fetch("http://localhost:8080/users/linknewaccount", {
            method: "POST",
            body: 'servicename=' + this.props.servicename + '&refreshtoken=' + refreshToken + '&accesstoken=' + token,
            headers: {
                    'Authorization': 'Bearer ' + this.props.token,
                    'Content-type': 'application/x-www-form-urlencoded'
                }
        }).then(res => res.json())
        .then(data => this.handleSaveActReac(data))
        .catch(err => console.log("Error log in the service: ", err));
    };

    responseGoogleSuccess(response) {
        if (response != null) {
            var token = Object(response).accessToken;
            var refreshToken = Object(response).refreshToken;
            fetch("http://localhost:8080/users/linknewaccount", {
                method: "POST",
                body: 'servicename=' + this.props.servicename + '&refreshtoken=' + refreshToken + '&accesstoken=' + token,
                headers: {
                        'Authorization': 'Bearer ' + this.props.token,
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => res.json())
                .then(data => this.handleSaveActReac(data))
                .catch(err => console.log("Error log in the service: ", err));
            console.log(response)
        } else {
            this.setState({msg: "Failed to login to Google"});
        }
    }

    responseGoogleFailure(response) {
        this.setState({msg: "Error while trying to connect to Google"})
        console.log(response);
    }

    onSocialLoginSuccess(response) {
        console.log(response)
        if (response != null) {
            console.log(response.code);
            var token = Object(response).code;
            var refreshToken = Object(response).refreshToken;
            fetch("http://localhost:8080/users/linknewaccount", {
            method: "POST",
            body: 'servicename=' + this.props.servicename + '&refreshtoken=' + refreshToken + '&accesstoken=' + token,
            headers: {
                    'Authorization': 'Bearer ' + this.props.token,
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).then(res => res.json())
            .then(data => this.handleSaveActReac(data))
            .catch(err => console.log("Error log in the service: ", err));
        } else {
            this.setState({msg: "Failed to login to Spotify"});
        }
    }

    onSocialLoginFailure(err) {
        console.log('ERR:', err)
    }

    intraCallBack(autologin) {
        console.log(autologin)
        if (autologin != null) {
            var refreshToken = undefined;
            fetch("http://localhost:8080/users/linknewaccount", {
            method: "POST",
            body: 'servicename=' + this.props.servicename + '&refreshtoken=' + refreshToken + '&accesstoken=' + autologin,
            headers: {
                    'Authorization': 'Bearer ' + this.props.token,
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).then(res => res.json())
            .then(data => this.handleSaveActReac(data))
            .catch(err => console.log("Error log in the service: ", err));
        } else {
            this.setState({msg: "Failed to login to Epitech Intra"});
        }
    }

    render() {
        var elem = []
        if (this.props.servicename === "Microsoft") {
            elem.push(<MicrosoftLogin key={2} clientId={this.state.microsoftclientID} authCallback={this.authHandler.bind(this)} graphScopes={["user.read", "offline_access", "Mail.Read", "Mail.ReadBasic", "Mail.ReadWrite", "Mail.Read.Shared", "Mail.ReadWrite.Shared", "Mail.Send", "Sites.Read.All", "Sites.ReadWrite.All", "Files.Read.All", "Files.ReadWrite", "Files.ReadWrite.All"]}/>)
        } else if (this.props.servicename === "Spotify") {
            elem.push(<SpotifyLogin clientId="SPOTIFY_CLIENT_ID"
                    redirectUri="http://localhost:8081/"
                    onSuccess={this.onSuccess.bind(this)}
                    onFailure={this.onFailure.bind(this)}
                    scope={"user-modify-playback-state"}/>)
        } else if (this.props.servicename === "Google") {
            elem.push(<GoogleLogin
                clientId="GOOGLE_CLIENT_ID"
                buttonText="Login"
                scope="https://www.googleapis.com/auth/youtube.readonly https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.metadata"
                onSuccess={this.responseGoogleSuccess.bind(this)}
                onFailure={this.responseGoogleFailure.bind(this)}
                cookiePolicy={'single_host_origin'}
            />)
        } else if (this.props.servicename === "Epitech Intra") {
            elem.push(<IntraAutologForm callBack={this.intraCallBack.bind(this)}/>)
        }
        return (
            <div className="auth_decay_windows">
                <div className="check_auth_block" >
                    <div className="check_auth_size" >
                        {this.state.msg}
                        {elem}
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckAuth;