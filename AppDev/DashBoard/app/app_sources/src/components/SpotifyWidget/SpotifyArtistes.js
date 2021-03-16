import React from 'react';

class SpotifyArtistes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: []
        };
    }
    handleUpdate(res) {
        this.setState({ playlists: res.artists.items });
    }
    updateRequest() {
        fetch("https://api.spotify.com/v1/me/following?type=artist", {
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
                <h3 key={0} >Artistes:</h3>
                <ul key={1} >
                    {list}
                </ul>
            </div>
        );
    }
}

export default SpotifyArtistes;