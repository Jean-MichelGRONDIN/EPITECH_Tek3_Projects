import React from 'react';

class SpotifyPlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: []
        };
    }
    handleUpdate(res) {
        this.setState({ playlists: res.items });
    }
    updateRequest() {
        fetch("https://api.spotify.com/v1/me/playlists", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.props.askToken() }
        })
        .then(res => res.json())
        .then(data => this.handleUpdate(data));
    }
    componentDidMount() {
        this.updateRequest();
    }
    render() {
        var list = [];
        let i = 0;
        this.state.playlists.forEach(elem => {
            list.push(<li key={i} >{elem.name}</li>);
            i++;
        });
        return (
            <div>
                <h3 key={0} >Playlists:</h3>
                <ul key={1} >
                    {list}
                </ul>
            </div>
        );
    }
}

export default SpotifyPlaylist;