import React from 'react';

class YoutubeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mails: [],
            keywords: "surfing"
        };
    }
    handleUpdate(res) {
        this.setState({ mails: res.items });
    }
    updateRequest() {
        fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + this.state.keywords + "&key=$MY_KEY", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.props.askToken(),
                Accept: "application/json",
                }
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
        this.state.mails.forEach(elem => {
            list.push(<li key={i} >{elem.snippet.title} FROM {elem.snippet.channelTitle}</li>);
            i++;
        });
        return (
            <div>
                <h3 key={0} >Mails:</h3>
                <div>
                    <label htmlFor="yTkeywords" >Key words:</label>
                    <input type="text" id="yTkeywords" name="yTkeywords"
                        value={this.state.keywords} onChange={ (e) => this.setState({ keywords: e.target.value }) }
                    />
                </div>
                <button key={1} onClick={ () => this.updateRequest() } >Search</button>
                <ul key={2} >
                    {list}
                </ul>
            </div>
        );
    }
}

export default YoutubeSearch;