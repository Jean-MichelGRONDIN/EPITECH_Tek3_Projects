import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';


const styles = StyleSheet.create({
    container: {
        padding: 100,
    },
    logo: {
        width: 100,
        height: 100,
    },
    hd_text: {
        fontSize: 30,
        paddingTop: 30,
        paddingBottom: 30,
        color: '#ffff',
        borderBottomWidth: 4,
        borderBottomColor: '#ffff',
        width: 300,
        textAlign: 'center',
    },
    second_view: {
        height: 400,
        width: 250,
        backgroundColor: '#ffff',
        borderRadius: 40,
    },
    space: {
        height: 40,
    },
    text: {
        width: 250,
        textAlign: 'center',
        padding: 10,
        fontSize: 17,
        color: '#11659f'
    },
    text_input: {
        height: 40,
        width: 150,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    text_user: {
        textAlign: 'left',
        color: 'grey'
    },
});

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            msg: "",
            finish: false
        };
    }
    handleResponse(res) {
        if (res.type === "ok") {
            this.setState({msg: "", finish: true});
        } else {
            this.setState({msg: "Registration failed because:" + res.msg});
        }
    }
    fetchNewUser() {
        if (this.state.username === "") {
            this.setState({msg: "Please enter a username"})
            return;
        }
        if (this.state.email === "") {
            this.setState({msg: "Please enter a valid email"})
            return;
        }
        if (this.state.password === "") {
            this.setState({msg: "Please enter a password"})
            return;
        }
        fetch('http://'+ this.props.ip +':8080/register', {
            method: 'post',
            body: 'username=' + this.state.username + '&firstname=' + this.state.username + '&lastname=' + this.state.username + '&email=' + this.state.email + '&password=' + this.state.password,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        })
        .then(res => res.json())
        .then(data => this.handleResponse(data))
        .catch(err => console.log("Error on fetching to register: ", err));
    }
    changeUsername(text) {
        this.setState({username: text});
    }
    changePassword(text) {
        this.setState({password: text});
    }
    changeEmail(text) {
        this.setState({email: text});
    }
    render () {
        var msg = [];
        if (this.state.msg !== "") {
            msg.push(<Text key={1} >{this.state.msg}</Text>);
        }
        if (this.state.finish === true) {
            return (
                <>
                    <Text key={0} >Registration successful please log in to continue</Text>
                    <Button name="authSwitchPage" id="authSwitchPage" title="Login" onPress={() => this.props.changeForm("login")}/>
                </>
            );
        } else {
            return (
                <>
                {msg}
                    <View style={styles.second_view}>
                    <Text style={styles.text}>Login to your account</Text>
                    <Text style={styles.text_user}>            Mail</Text>
                    <View style={{alignItems: 'center'}}>
                        <TextInput style={styles.text_input} onChangeText={text => this.changeEmail(text)} value={this.state.email}></TextInput>
                    </View>
                    <View style={{height: 20}}></View>
                    <Text style={styles.text_user}>            Username</Text>
                    <View style={{alignItems: 'center'}}>
                        <TextInput style={styles.text_input} onChangeText={text => this.changeUsername(text)} value={this.state.username}></TextInput>
                    </View>
                    <View style={{height: 20}}></View>
                    <Text style={styles.text_user}>            Password</Text>
                    <View style={{alignItems: 'center'}}>
                        <TextInput style={styles.text_input} onChangeText={text => this.changePassword(text)} value={this.state.password}></TextInput>
                    </View>
                    <View style={{height: 20}}></View>
                    <Button title="Register" onPress={() => this.fetchNewUser()}/>
                    <Button color="grey" name="authSwitchPage" id="authSwitchPage" title="Login" onPress={() => this.props.changeForm("login")}/>
                </View>
            </>
            );
        }
    }
}

export default RegisterForm;