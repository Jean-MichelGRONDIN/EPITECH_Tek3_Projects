import React from 'react';

class HarryPotterGetHouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Designed_House : "",
        };
    }
    getHouseRequest() {
        fetch('https://www.potterapi.com/v1/sortingHat')
        .then(res => res.json())
        .then((data) => {
        this.setState({ Designed_House: data })
        });
    }
    render() {
        var AssignedHouse = [];
        if (this.state.Designed_House !== "")
            AssignedHouse.push(<p key={2} >You were assigned to {this.state.Designed_House}</p>);
        return (
            <div>
                <h2 key={0} >Here you can be assigned to a House</h2>
                <button onClick={() => this.getHouseRequest()} key={1} >Get a house (kidos only)</button>
                <br/>
                {AssignedHouse}
            </div>
        );
    }
}

export default HarryPotterGetHouse;