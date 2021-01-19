import React from 'react';

import SpotifyLogin from 'react-spotify-login';

import SpotifyPlaylist from './SpotifyPlaylist';
import SpotifyArtistes from './SpotifyArtistes';

import SpotifyConfig from './SpotifyConfig';

class SpotifyWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instance: "playlist",
            tab: [
                ["playlist", "See my playlists", <SpotifyPlaylist key={0} askToken={this.getToken.bind(this)} />],
                ["artistes", "See my followed artistes", <SpotifyArtistes key={1} askToken={this.getToken.bind(this)} />]
            ],
            title: "Spotify Title",
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
        this.setState({ token: res.access_token });
    }
    loginFailure(res) {
        console.log("Failed to login", res);
    }
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
                <SpotifyLogin
                    clientId={"$MY_CLIENT_ID"}
                    redirectUri={encodeURI("http://localhost:8080")}
                    onSuccess={this.loginSuccess.bind(this)}
                    onFailure={this.loginFailure.bind(this)}
                    scope={"user-follow-read"}
                />;
        }
        return (
            <div className="widgetBox backgroundColorWhite" >
                <div>
                    <h3 key={0} >{this.state.title}</h3>
                    <button key={1} onClick={() => this.props.selfDelete(this.props.myId)} >Delete</button>
                    <SpotifyConfig key={2} confInstance={this.changeInstance.bind(this)}
                        title={this.state.title} confTitle={this.changeTitle.bind(this)}
                        configTab={this.state.tab} />
                </div>
                <div>
                    {part}
                </div>
            </div>
        );
    }
}

export default SpotifyWidget;