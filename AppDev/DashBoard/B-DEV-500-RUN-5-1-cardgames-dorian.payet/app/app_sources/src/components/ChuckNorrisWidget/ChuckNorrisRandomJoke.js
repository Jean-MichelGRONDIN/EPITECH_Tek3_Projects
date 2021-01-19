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
        fetch("https://api.chucknorris.io/jokes/random")
        .then(res => res.json())
        .then((data) => {
            this.setState({ text: data.value, source: data.created_at })
        });
    }
    render() {
        return (
            <div>
                <h2 key={0} >Here a joke from Chuck Norris have fun:</h2>
                <h3 key={1} >{this.state.text}</h3>
                <h4 key={2} >Created At: {this.state.source}</h4>
            </div>
        );
    }
}

export default UselessFact;