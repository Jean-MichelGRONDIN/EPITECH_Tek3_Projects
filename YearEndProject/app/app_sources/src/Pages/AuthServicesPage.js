import React from 'react';

import logo from '../assets/Logo.png';
import user_picture from '../assets/Default_user_picture.png';
import AddActReacButton from '../Components/AddActionReaction/AddActReacButton';
import MicrosoftLogin from "react-microsoft-login";
import SpotifyLogin from 'react-spotify-login';
import GoogleLogin from 'react-google-login';
import IntraAutologForm from '../Components/ServicesAuth/IntraAutologForm'

class AuthServicesPage extends React.Component {
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
    handleSaveActReac(data) {
        console.log("reponse", data);
        this.props.updateall();
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
    onSuccess(response) {
        if (response != null) {
            console.log(response.access_token);
            var token = Object(response).access_token;
            var refreshToken = Object(response).refreshToken;
            fetch("http://localhost:8080/users/linknewaccount", {
            method: "POST",
            body: 'servicename=' + "Spotify" + '&refreshtoken=' + refreshToken + '&accesstoken=' + token,
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
            body: 'servicename=' + "Microsoft" + '&refreshtoken=' + refreshToken + '&accesstoken=' + token,
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
                body: 'servicename=' + "Google" + '&refreshtoken=' + refreshToken + '&accesstoken=' + token,
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
    intraCallBack(autologin) {
        console.log(autologin)
        if (autologin != null) {
            var refreshToken = undefined;
            fetch("http://localhost:8080/users/linknewaccount", {
            method: "POST",
            body: 'servicename=' + "Epitech Intra" + '&refreshtoken=' + refreshToken + '&accesstoken=' + autologin,
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
    removeFromArray(array, elem) {
        var newArr = []
        array.forEach(line => {
            if (line.servicename !== elem.servicename) {
                newArr.push(line)
            }
        })
        return newArr;
    }
    render() {
        var list = this.props.services;
        var accountList = this.props.userinfos.accounts;
        var serviceList = this.props.services;
        var blockList = []
        accountList.forEach(elem => {
            serviceList.forEach(service => {
                if (elem.sericeid === service._id) {
                    list = this.removeFromArray(list, service)
                }
            })
        })
        list.forEach(elem => {
                if (elem.servicename === "Microsoft") {
                    blockList.push(
                        <div key={elem._id} className="auth_block" >
                            <h1 className="h1 text_blue" >Microsoft Login</h1>
                            <MicrosoftLogin key={2} clientId={this.state.microsoftclientID} authCallback={this.authHandler.bind(this)} graphScopes={["user.read", "offline_access", "Mail.Read", "Mail.ReadBasic", "Mail.ReadWrite", "Mail.Read.Shared", "Mail.ReadWrite.Shared", "Mail.Send", "Sites.Read.All", "Sites.ReadWrite.All", "Files.Read.All", "Files.ReadWrite", "Files.ReadWrite.All"]}/>
                        </div>)
                } else if (elem.servicename === "Spotify") {
                    blockList.push(
                        <div key={elem._id} className="auth_block" >
                            <h1 className="h1 text_blue" >Spotify Login</h1>
                            <SpotifyLogin clientId="SPOTIFY_CLIENT_ID"
                            redirectUri="http://localhost:8081/"
                            onSuccess={this.onSuccess.bind(this)}
                            onFailure={this.onFailure.bind(this)}
                            scope={"user-modify-playback-state"}/>
                        </div>)
                } else if (elem.servicename === "Google") {
                    blockList.push(
                        <div key={elem._id} className="auth_block" >
                            <h1 className="h1 text_blue" >Google Login</h1>
                            <div>
                            <GoogleLogin
                            clientId="GOOGLE_CLIENT_ID"
                            buttonText="Login"
                            scope="https://www.googleapis.com/auth/youtube.readonly https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.metadata"
                            onSuccess={this.responseGoogleSuccess.bind(this)}
                            onFailure={this.responseGoogleFailure.bind(this)}
                            cookiePolicy={'single_host_origin'}
                            />
                            </div>
                        </div>)
                } else if (elem.servicename === "Epitech Intra") {
                    blockList.push(
                        <div key={elem._id} className="auth_block" >
                            <h1 className="h1 text_blue" >Epitech Intra Login</h1>
                            <IntraAutologForm callBack={this.intraCallBack.bind(this)}/>
                        </div>)
                }
        });
        return (
            <div className="page_block" >
                <div className="page_header text_white" >
                    <div className="header_left" >
                        <div className="display_inline" >
                            <img src={logo} key={0} alt="Home" className="float_left logo" onClick={ () => window.location.replace("/")} />
                            <h1 key={1} className="h1 left_header_text big_font_w float_left" >AREA</h1>
                        </div>
                        <div className="menu" >
                            <a key={2} className="h1 left_header_text little_font_w text_white link_no_underline" href="/" >Home</a>
                            <a key={3} className="h1 left_header_text little_font_w text_white link_no_underline" href="/service" >Service</a>
                            <a key={4} className="h1 left_header_text big_font_w text_white link_no_underline" href="/authentication" >Authentication</a>
                        </div>
                    </div>
                    <div className="header_left header_right" >
                        <h4 key={0} className="h4 user_name_text little_font_w float_left" >{this.props.userinfos.username}</h4>
                        <img alt="" key={1} className="profile_picture" src={user_picture} onClick={ () => window.location.replace("/profile")} />
                    </div>
                </div>
                <div className="main_body" >
                    {blockList}
                    <AddActReacButton clientsids={this.props.clientsids} userinfos={this.props.userinfos} updateall={this.props.updateall} services={this.props.services} token={this.props.token} />
                </div>
            </div>
        );
    }
}

export default AuthServicesPage;