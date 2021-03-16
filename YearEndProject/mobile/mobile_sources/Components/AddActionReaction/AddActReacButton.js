import React from 'react';

import { Button } from 'react-native';

class AddActReacButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
    }
    switchWindow() {
        this.setState({clicked: !this.state.clicked});
        this.props.clic();
    }
    render () {
        if (this.state.clicked === false) {
            return (
                <Button style={{borderRadius: '3rem'}} title="+" onPress={() => this.switchWindow()} ></Button>
            );
        }
        return (
            <>
                <Button title="-" color="red" onPress={() => this.switchWindow()} ></Button>
            </>
        );
    }
}

export default AddActReacButton;