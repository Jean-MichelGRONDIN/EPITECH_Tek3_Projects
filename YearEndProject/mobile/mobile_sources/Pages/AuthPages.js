import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import logo from '../assets/Logo.png'
import LoginForm from '../Components/AuthComponents/LoginForm';
import RegisterForm from '../Components/AuthComponents/RegisterForm';

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

class AuthPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: "login",
            username: "",
            password: ""
        }
    }
    changeForm(newaction) {
        this.setState({ form: newaction });
    }
    render () {
        var elem = [];
        if (this.state.form === "register") {
            elem.push(<RegisterForm ip={this.props.ip} setToken={this.props.setToken} changeForm={this.changeForm.bind(this)} key={1} />);
        } else {
            elem.push(<LoginForm ip={this.props.ip} setToken={this.props.setToken} clientsids={this.props.clientsids} changeForm={this.changeForm.bind(this)} key={2} />);
        }
        return (
            <>
                <Image
                style={styles.logo}
                source={
                    logo
                }
                />
                <Text style={styles.hd_text}>AREA</Text>
                <View style={styles.space}></View>
                {elem}
            </>
        );
    }
}

export default AuthPages;