import React from 'react';
import { View, Image, StyleSheet, Text, ScrollView, Button, Switch } from 'react-native';
import icon from '../assets/icon.png'
import logo from '../assets/Logo.png'
import AddActReacButton from '../Components/AddActionReaction/AddActReacButton'
import AddActReacBloc from '../Components/AddActionReaction/AddActReacBloc';

import { Link } from "react-router-native";

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        width: 50,
        left: "30%",
        top: "30%",
        borderRadius: 360
    },
    header_button_add_block: {
        fontSize: 20,
        width: 50,
        left: "30%",
        top: "30%",
        borderRadius: 360
    },
    header_button_home: {
        fontSize: 20,
        width: 50,
        left: "30%",
        borderRadius: 360
    },
    errorServiecEnableMsg: {
        backgroundColor: '#D44C3D',
        marginRight : '10%',
        marginLeft : '10%',
        position: 'relative',
        top: '5%'
    }
});

class ServicePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: null,
            addBlock: false
        };
    }
    handleEnableActReac(data) {
        if (this.state.msg !== null) {
            this.setState({ msg: null });
        }
        this.props.updateall();
    }
    getServiceIdFromActIdOrReacId(idToFind, services) {
        for (let index = 0; index < services.length; index++) {
            const actions = services[index].actions;
            const reactions = services[index].reactions;
            for (let i_one = 0; i_one < actions.length; i_one++) {
                const actElem = actions[i_one];
                if (idToFind == actElem._id) {
                    return (services[index]._id);
                }
            }
            for (let i_one = 0; i_one < reactions.length; i_one++) {
                const ReacElem = reactions[i_one];
                if (idToFind == ReacElem._id) {
                    return (services[index]._id);
                }
            }
        }
        return (null);
    }
    checklinkedAccounts(ActReacid) {
        var actGood = false;
        var reacGood = false;
        var tmpActReacList = this.props.userinfos.actionsreactions;
        for (let i_one = 0; i_one < tmpActReacList.length; i_one++) {
            const tmpActReac = tmpActReacList[i_one];
            if (ActReacid == tmpActReac._id) {
                var tmpActServId = this.getServiceIdFromActIdOrReacId(tmpActReac.actionid, this.props.services);
                var tmpReactServId = this.getServiceIdFromActIdOrReacId(tmpActReac.reactionsid, this.props.services);
                if (tmpActServId == "603cd145f7d6f02be369c141" || tmpActServId == "603cd1eef7d6f02be369c143") {
                    actGood = true;
                }
                if (tmpReactServId == "603cd145f7d6f02be369c141" || tmpReactServId == "603cd1eef7d6f02be369c143") {
                    reacGood = true;
                }
                if (actGood === false || reacGood === false) {
                    for (let i_two = 0; i_two < this.props.userinfos.accounts.length; i_two++) {
                        const tmpAccount = this.props.userinfos.accounts[i_two];
                        if (actGood === false && tmpActServId !== null && tmpActServId == tmpAccount.sericeid) {
                            actGood = true;
                        }
                        if (reacGood === false && tmpReactServId !== null && tmpReactServId == tmpAccount.sericeid) {
                            reacGood = true;
                        }
                    }
                }
            }
        }
        if (actGood === true && reacGood === true) {
            return (true);
        }
        return (false);
    }
    add_bloc() {
        this.setState({addBlock: !this.state.addBlock});
    }
    fetchEnableActReac(myid, value) {
        if (this.checklinkedAccounts(myid) === false) {
            this.setState({ msg: <Text style={{color: 'white', textAlign: 'center'}} key="error_msg" >Please link your services account on the page Authentification by using your browser before being able to start this Action Reaction !</Text> })
        } else {
            fetch('http://'+ this.props.ip +':8080/users/switchEnable', {
                method: 'post',
                body: 'elemid=' + myid + '&newvalue=' + value,
                headers: { 'Authorization': 'Bearer ' + this.props.token, 'Content-type': 'application/x-www-form-urlencoded' }
            })
            .then(res => res.json())
            .then(data => this.handleEnableActReac(data))
            .catch(err => console.log("Error on saving new action reaction: ", err));
        }
    }
    fetchPinToHome(myid, value) {
        fetch('http://'+ this.props.ip +':8080/users/switchHome', {
            method: 'post',
            body: 'elemid=' + myid + '&newvalue=' + value,
            headers: { 'Authorization': 'Bearer ' + this.props.token, 'Content-type': 'application/x-www-form-urlencoded' }
        })
        .then(res => res.json())
        .then(data => this.handleEnableActReac(data))
        .catch(err => console.log("Error on saving new action reaction: ", err));
    }
    fetchDelete(myid) {
        fetch('http://'+ this.props.ip +':8080/users/deleteActReac', {
            method: 'post',
            body: 'elemid=' + myid,
            headers: { 'Authorization': 'Bearer ' + this.props.token, 'Content-type': 'application/x-www-form-urlencoded' }
        })
        .then(res => res.json())
        .then(data => this.handleEnableActReac(data))
        .catch(err => console.log("Error on saving new action reaction: ", err));
    }
    render() {
        if (this.state.addBlock === true) {
            return (<>
                <AddActReacBloc updateall={this.props.updateall} clic={this.add_bloc.bind(this)} ip={this.props.ip} clientsids={this.props.clientsids} userinfos={this.props.userinfos} services={this.props.services} token={this.props.token}/>
                <View style={styles.header_button_add_block} >
                    <AddActReacButton clic={this.add_bloc.bind(this)} clientsids={this.props.clientsids} userinfos={this.props.userinfos} services={this.props.services} token={this.props.token} />
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={{width: 50, height: 50, top: "65%", left: "2%"}}source={logo}></Image>
                    <View style={{width: 100, height: 50, textAlign: 'center', top: "67%", left: "4%"}}><Text style={{color: 'white', fontSize: 25}}>AREA</Text></View>
                </View>
                </>)
        }
        var tmpmsg = [];
        var blockList = [];
        var tmpActReacList = this.props.userinfos.actionsreactions;
        tmpActReacList.forEach(elem => {
            blockList.push(
                <View key={elem._id} style={{width: 350, height: 200, marginTop: '10%'}}>
                    <Text style={{color: 'white'}}>Action: {elem.actionname}</Text>
                    <Text style={{color: 'white'}}>Reaction: {elem.reactionname}</Text>
                    <Text style={{color: 'white'}}>Home</Text>
                    <Switch onChange={() => this.fetchPinToHome(elem._id, !elem.home)} value={elem.home} ></Switch>
                    <Text style={{color: 'white'}}>Enabled</Text>
                    <Switch onChange={() => this.fetchEnableActReac(elem._id, !elem.enable)} value={elem.enable} ></Switch>
                    <Text style={{color: 'white'}}>Delete</Text>
                    <Button color="red" title="X" onPress={ () => this.fetchDelete(elem._id)} ></Button>
                </View>
            );
        });
        if (this.state.msg !== null) {
            tmpmsg.push(
                <View key="errorServiecEnableMsg" style={styles.errorServiecEnableMsg} >{this.state.msg}</View>
                    );
        }
        return (
                <>
                    <View style={{flex: 1, flexDirection: 'row', marginBottom: 30}}>
                        <View style={{width: 100, height: 75, textAlign: 'center', marginTop: 60}}><Link to="/" ><Text style={{color: 'white', fontSize: 25}}>Home</Text></Link></View>
                        <View style={{width: 100, height: 75, textAlign: 'center', marginTop: 60, marginRight: 50}}><Link to="/service" ><Text style={{color: 'white', fontSize: 25}}>Service</Text></Link></View>
                        <Link to="/profile" ><Image style={{width: 50, height: 50, marginTop: 60}}source={icon}></Image></Link>
                    </View>
                    {tmpmsg}
                    <ScrollView style={{height: '72%', marginTop: '10%'}}>
                        {blockList}
                    </ScrollView>
                    <View style={styles.header} >
                        <AddActReacButton clientsids={this.props.clientsids} userinfos={this.props.userinfos} services={this.props.services} token={this.props.token} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', bottom: '5%'}}>
                        <Image style={{width: 50, height: 50, left: "2%"}}source={logo}></Image>
                        <View style={{width: 100, height: 50, textAlign: 'center', left: "4%", top: '2%'}}><Text style={{color: 'white', fontSize: 25}}>AREA</Text></View>
                        <View style={styles.header_button_home} >
                            <AddActReacButton clic={this.add_bloc.bind(this)} clientsids={this.props.clientsids} userinfos={this.props.userinfos} services={this.props.services} token={this.props.token} />
                        </View>
                    </View>
                </>
        );
    }
}

export default ServicePage;