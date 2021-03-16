import React from 'react';

class AboutJsonPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: ""
        };
    }
    componentDidMount() {
        this.fetchUserConfig();
    }
    fetchUserConfig() {
        fetch('http://localhost:8080/users/config', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.props.token }
        })
        .then(res => res.json())
        .then(data => this.setState({config: data}))
        .catch(err => console.log("Error on fetching to retreive user config: ", err));
    }
    render () {
        return (
            <div>
                <pre className="text_white" >
                    {JSON.stringify(this.state.config, null, 2)}
                </pre>
            </div>
        );
    }
}

export default AboutJsonPage;