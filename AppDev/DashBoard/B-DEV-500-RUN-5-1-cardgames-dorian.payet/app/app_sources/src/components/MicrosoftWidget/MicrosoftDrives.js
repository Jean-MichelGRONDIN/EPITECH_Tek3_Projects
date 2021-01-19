import React from 'react';

class MicrosoftDrives extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drives: []
        };
    }
    handleUpdate(res) {
        this.setState({ drives: res.value });
    }
    updateRequest() {
        fetch("https://graph.microsoft.com/v1.0//me/drives", {
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
        this.state.drives.forEach(elem => {
            list.push(<li key={i} >[{elem.lastModifiedDateTime}] {elem.name} </li>);
            i++;
        });
        return (
            <div>
                <h3 key={0} >Drives:</h3>
                <ul key={1} >
                    {list}
                </ul>
            </div>
        );
    }
}

export default MicrosoftDrives;