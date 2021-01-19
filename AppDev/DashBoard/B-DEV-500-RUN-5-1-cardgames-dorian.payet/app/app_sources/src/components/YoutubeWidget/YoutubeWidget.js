import React from 'react';

import GoogleLogin from 'react-google-login';

import YoutubeSearch from './YoutubeSearch';

import YoutubeConfig from './YoutubeConfig';

class YoutubeWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instance: "search",
            tab: [
                ["search", "Search videos", <YoutubeSearch key={0} askToken={this.getToken.bind(this)} />],
            ],
            title: "Youtube Title",
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
        console.log("vla ton acessToken gros: ", res);
        this.setState({ token: res.accessToken });
    }
    loginFailure(res) {
        console.log("Failed to login", res);
    }
    authHandler(data) {
        if (data) {
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
            <GoogleLogin
                key={0}
                clientId="$MY_CLIENT_ID"
                buttonText="Login with Google"
                scope="https://www.googleapis.com/auth/cloud-platform"
                onSuccess={this.authHandler.bind(this)}
                onFailure={this.authHandler.bind(this)}
                cookiePolicy={'single_host_origin'}
            />
        }
        return (
            <div className="widgetBox backgroundColorWhite" >
                <div>
                    <h3 key={0} >{this.state.title}</h3>
                    <button key={1} onClick={() => this.props.selfDelete(this.props.myId)} >Delete</button>
                    <YoutubeConfig
                        key={2} confInstance={this.changeInstance.bind(this)}
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

export default YoutubeWidget;