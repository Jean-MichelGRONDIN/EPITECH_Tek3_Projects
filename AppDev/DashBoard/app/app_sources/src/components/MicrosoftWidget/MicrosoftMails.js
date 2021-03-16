import React from 'react';

class MicrosoftMails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mails: []
        };
    }
    handleUpdate(res) {
        this.setState({ mails: res.value });
    }
    updateRequest() {
        fetch("https://graph.microsoft.com/v1.0/me/messages?$select=sender,subject", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.props.askToken(),
                Accept: "application/json",
                Prefer: "outlook.allow-unsafe-html",
                "outlook.body-content-type": 'text'
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
            list.push(<li key={i} >{elem.subject}</li>);
            i++;
        });
        return (
            <div>
                <h3 key={0} >Mails:</h3>
                <ul key={1} >
                    {list}
                </ul>
            </div>
        );
    }
}

export default MicrosoftMails;