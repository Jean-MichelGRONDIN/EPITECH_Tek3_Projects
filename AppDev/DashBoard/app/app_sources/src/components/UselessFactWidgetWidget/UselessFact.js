import React from 'react';

class UselessFact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text : "",
            source: ""
        };
    }
    componentDidMount() {
        this.getIpInfos();
    }
    getIpInfos() {
        fetch("https://uselessfacts.jsph.pl/random.json?language=en")
        .then(res => res.json())
        .then((data) => {
            this.setState({ text: data.text, source: data.source })
        });
    }
    render() {
        return (
            <div>
                <h2 key={0} >Here a random useless facts just because it cool:</h2>
                <h3 key={1} >{this.state.text}</h3>
                <h4 key={2} >From: {this.state.source}</h4>
            </div>
        );
    }
}

export default UselessFact;