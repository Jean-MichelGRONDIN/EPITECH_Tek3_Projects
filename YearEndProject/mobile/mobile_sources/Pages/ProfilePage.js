import React from 'react';
import { View, Image, StyleSheet, Text, Button } from 'react-native';
import logo from '../assets/Logo.png';

import { Link } from "react-router-native";

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        width: 50,
        left: "30%",
        top: "30%",
        borderRadius: 360
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
    logo: {
        width: 100,
        height: 100,
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

class ProfilePage extends React.Component {
    signOut() {
        this.props.unSetToken();
    }
    render() {
        return (
            <>
                <Link to="/" ><Image
                style={styles.logo}
                source={
                    logo
                }
                /></Link>
                <Text style={styles.hd_text}>AREA</Text>
                <View style={styles.space}></View>
                <View style={styles.second_view}>
                    <Text style={styles.text_user}>            Username</Text>
                    <Text style={styles.text}>{this.props.userinfos.username}</Text>
                    <View style={{height: 20}}></View>
                    <Text style={styles.text_user}>            Firstname</Text>
                    <Text style={styles.text}>{this.props.userinfos.firstname}</Text>
                    <View style={{height: 20}}></View>
                    <Text style={styles.text_user}>            Lastname</Text>
                    <Text style={styles.text}>{this.props.userinfos.lastname}</Text>
                    <View style={{height: 20}}></View>
                    <Text style={styles.text_user}>            Mail</Text>
                    <Text style={styles.text}>{this.props.userinfos.email}</Text>
                    <View style={{height: 20}}></View>
                    <Button title="Sign Out" onPress={() => this.signOut()}/>
                </View>
            </>
        );
    }
}

export default ProfilePage;