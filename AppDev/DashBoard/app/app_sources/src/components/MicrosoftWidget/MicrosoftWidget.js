import React from 'react';

import MicrosoftLogin from "react-microsoft-login";

import MicrosoftMails from './MicrosoftMails';
import MicrosoftDrives from './MicrosoftDrives';

import MicrosoftConfig from './MicrosoftConfig';

class MicrosoftWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instance: "mails",
            tab: [
                ["mails", "See my lasts mails list", <MicrosoftMails key={0} askToken={this.getToken.bind(this)} />],
                ["drives", "See my drives list", <MicrosoftDrives key={1} askToken={this.getToken.bind(this)} />]
            ],
            title: "Microsoft Title",
            token : ""
        };
    }
    changeInstance(newInstance) {
        this.setState({instance: newInstance});
    }
    changeTitle(newTitle) {
        this.setState({title: newTitle});
    }
    loginSuccess(res) {
        this.setState({ token: res.accessToken });
    }
    loginFailure(res) {
        console.log("Failed to login", res);
    }
    authHandler(err, data) {
        console.log("Error: ", err);
        console.log("Data: ",  data);
        if (!err && data) {
            this.loginSuccess(data);
        }
    };
    getToken() {
        return (this.state.token);
    }
    render () {
        var part = [];
        this.state.tab.forEach(element => {
            if (this.state.instance === element[0]) {
                part.push(element[2]);
            }
        });
        if (part.length === 0) {
            part.push(<h1 key={1} >An error occured</h1>);
        }
        if (this.state.token === "") {
            part =
            <MicrosoftLogin
                key={0}
                clientId={"$MY_CLIENT_ID"}
                authCallback={this.authHandler.bind(this)}
                graphScopes={["user.read", "offline_access", "Mail.Read", "Mail.ReadBasic", "Mail.ReadWrite", "Mail.Read.Shared", "Mail.ReadWrite.Shared"]}
            />
        }
        return (
            <div className="widgetBox backgroundColorWhite" >
                <div>
                    <h3 key={0} >{this.state.title}</h3>
                    <button key={1} onClick={() => this.props.selfDelete(this.props.myId)} >Delete</button>
                    <MicrosoftConfig key={2} confInstance={this.changeInstance.bind(this)}
                        title={this.state.title} confTitle={this.changeTitle.bind(this)}
                        configTab={this.state.tab}
                        />
                </div>
                <div>
                    {part}
                </div>
            </div>
        );
    }
}

export default MicrosoftWidget;