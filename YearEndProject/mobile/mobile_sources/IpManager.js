import React from 'react';

import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

import AuthManagers from './AuthManager';

const styles = StyleSheet.create({
    text_input: {
        height: 40,
        width: 150,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
});

class IpManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: "",
            tmpip: ""
        }
    }
    setnewIP() {
        this.setState({ ip: this.state.tmpip, tmpip: "" });
    }
    render() {
        if (this.state.ip === "") {
            return (
                <>
                    <Text>Please Enter an ip :</Text>
                    <View style={{alignItems: 'center'}}>
                        <TextInput style={styles.text_input} onChangeText={(text) => this.setState({ tmpip: text})} value={this.state.tmpip} ></TextInput>
                    </View>
                    <Button title="Validate" onPress={ () => this.setnewIP() } />
                </>
            );
        }
        return (<AuthManagers ip={this.state.ip} />);
    }
}

export default IpManager;