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
        height: 300,
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

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            msg: "",
            microsoftclientID: ""
        };
    }
    saveTokenAndReload(token) {
        this.props.setToken(token);
    }
    handleResponse(res) {
        if (res.type === "ok") {
            this.setState({msg: "Log in success"});
        } else {
            this.setState({msg: "Log in failed"});
        }
    }
    fetchLogin() {
        fetch('http://'+ this.props.ip +':8080/login', {
            method: 'post',
            body: 'username=' + this.state.username +'&password=' + this.state.password,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        })
        .then(res => res.json())
        .then(data => this.authHandlerResponse(data))
        .catch(err => console.log("Error on fetching to login: ", err));
    }
    authHandlerResponse(res) {
        if (res.type === "ok") {
            this.saveTokenAndReload(res.token);
            this.setState({msg: "Login succeed in the backend"})
        } else {
            this.setState({msg: "Login failed in the backend"});
        }
    }
    authHandler(err, data) {
        if (err) {
            this.setState({msg: "Microsoft log in failed"});
            return;
        }
        fetch('http://'+ this.props.ip +':8080/thirdpartyLogin', {
            method: 'post',
            body: 'username=' + data.account.name + '&firstname=MicrosoftAuth2&lastname=MicrosoftAuth2&email=' + data.account.userName + '&password=' + data.account.accountIdentifier,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        })
        .then(res => res.json())
        .then(data => this.authHandlerResponse(data))
        .catch(err => console.log("Error on fetching to login thirdparty: ", err));
    };
    changeUsername(text) {
        this.setState({username: text});
    }
    changePassword(text) {
        this.setState({password: text});
    }
    componentDidMount() {
        var tmp = this.props.clientsids;
        tmp.forEach(elem => {
            var tmpObj = elem;
            if (tmpObj.servicename === "Microsoft") {
                this.setState({microsoftclientID: tmpObj.clientid})
            }
        });
    }
    render() {
        var msg = [];
        if (this.state.msg !== "") {
            msg.push(<Text key={1}>{this.state.msg}</Text>);
        }
        return (
            <>
                {msg}
                    <View style={styles.second_view}>
                    <Text style={styles.text}>Login to your account</Text>
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
                    <Button title="Login" onPress={() => this.fetchLogin()}/>
                    <Button color="grey" title="Register" onPress={() => this.props.changeForm("register")}/>
                </View>
            </>
        );
    }
}

export default LoginForm;