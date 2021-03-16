import React from 'react';

import { View, StyleSheet, Text, Button} from 'react-native';

import {Picker} from '@react-native-picker/picker';


const styles = StyleSheet.create({
    black_act_react: {
        fontSize: 20,
        color: "#000000",
        borderBottomWidth: 1,
        borderBottomColor: "#ffffff"
    },
    white_act_react: {
        fontSize: 20,
        color: "#ffffff",
        borderBottomWidth: 1,
        borderBottomColor: "#ffffff"
    },
    scroll_view_act_react: {
        width: 250,
        height: 150
    },
    space: {
        top: "10%"
    },
    space2: {
        top: "550%"
    },
    hd_text: {
        backgroundColor: "lightgrey",
        width: 90,
    },
    down: {
        top: "35%"
    }
});

class AddActionBloc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectServiceLeft: "",
            selectServiceRight: "",
            selectedAction: "",
            selectedReaction: "",
            actionName: "",
            reactionName: ""
        };
    }
    componentDidMount() {
        var tmpServiceLeft = "";
        var tmpServiceRight = "";
        var tmpSelectedAction = "";
        var tmpSelectedReaction = "";

        var tmp_tab = this.props.services;
        for (let index = 0; index < tmp_tab.length && tmpServiceLeft === ""; index++) {
            const element = tmp_tab[index];
            if (element.actions.length !== 0) {
                tmpServiceLeft = this.props.services[index];
                tmpSelectedAction = this.props.services[index].actions[0];
            }
        }
        for (let index = 0; index < tmp_tab.length && tmpServiceRight === ""; index++) {
            const element = tmp_tab[index];
            if (element.reactions.length !== 0) {
                tmpServiceRight = this.props.services[index];
                tmpSelectedReaction = this.props.services[index].reactions[0];
            }
        }
        this.setState({
            selectServiceLeft: tmpServiceLeft,
            selectServiceRight: tmpServiceRight,
            selectedAction: tmpSelectedAction,
            selectedReaction: tmpSelectedReaction,
            actionName: tmpServiceLeft,
            reactionName: tmpServiceRight
        })
    }
    handleSaveActReac(data) {
        this.props.clic();
        this.props.updateall();
    }
    SaveNewActReac() {
        fetch('http://'+ this.props.ip +':8080/users/addservicesActReact', {
            method: 'post',
            body: 'actionid=' + this.state.selectedAction._id + '&reactionid=' + this.state.selectedReaction._id,
            headers: { 'Authorization': 'Bearer ' + this.props.token, 'Content-type': 'application/x-www-form-urlencoded' }
        })
        .then(res => res.json())
        .then(data => this.handleSaveActReac(data))
        .catch(err => console.log("Error on saving new action reaction: ", err));
    }
    render() {
        if (this.state.selectServiceLeft === "" || this.state.selectServiceRight === "" || this.state.selectedAction._id === "" || this.state.selectedReaction._id === "") {
            return(<View></View>);
        }
        var options = [];
        var optionsreaction = [];
        var tmp_tab = this.props.services;
        let i = 0;
        tmp_tab.forEach(elem => {
            if (elem.actions.length !== 0) {
                options.push(<Picker.Item key={elem.servicename} label={elem.servicename} value={i}/>)
            }
            if (elem.reactions.length !== 0) {
                optionsreaction.push(<Picker.Item key={elem.servicename} label={elem.servicename} value={i}/>)
            }
            i++;
        });
        var actions_tab = [];
        var tmp_action_tab = this.state.selectServiceLeft.actions;
        tmp_action_tab.forEach(elem => {
            if (this.state.selectedAction._id === elem._id) {
                actions_tab.push(<Text onPress={ () => this.setState({selectedAction: elem}) } key={elem.name} style={styles.black_act_react} >{elem.name}</Text>)
            } else {
                actions_tab.push(<Text onPress={ () => this.setState({selectedAction: elem}) } key={elem.name} style={styles.white_act_react} >{elem.name}</Text>)
            }
        });
        var reactions_tab = [];
        var tmp_reaction_tab = this.state.selectServiceRight.reactions;
        tmp_reaction_tab.forEach(elem => {
            if (this.state.selectedReaction._id === elem._id) {
                reactions_tab.push(<Text onPress={ () => this.setState({selectedReaction: elem}) } key={elem.name} style={styles.black_act_react} >{elem.name}</Text>)
            } else {
                reactions_tab.push(<Text onPress={ () => this.setState({selectedReaction: elem}) } key={elem.name} style={styles.white_act_react}>{elem.name}</Text>)
            }
            });


        return (
            <View>
                <View style={styles.space}>
                    <View>
                        <Text style={styles.hd_text}>Add action</Text>
                        <View>
                            <View style={styles.scroll_view_act_react}>
                                <Picker selectedValue={this.state.actionName} onValueChange={ (itemValue, itemIndex) => this.setState({ selectServiceLeft: this.props.services[itemValue], selectedAction: this.props.services[itemValue].actions[0], actionName: itemValue })} >
                                    {options}
                                </Picker>
                                {actions_tab}
                            </View>
                        </View>
                    </View>
                    <View style={styles.down}>
                        <Text style={styles.hd_text}>Add reaction</Text>
                        <View>
                            <View style={styles.scroll_view_act_react}>
                                <Picker selectedValue={this.state.reactionName} onValueChange={ (itemValue, itemIndex) => this.setState({ selectServiceRight: this.props.services[itemValue], selectedReaction: this.props.services[itemValue].reactions[0], reactionName: itemValue })} >
                                    {optionsreaction}
                                </Picker>
                                {reactions_tab}
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <>
                        <View style={styles.space2}>
                            <Button title="Add" onPress={ () => this.SaveNewActReac()} ></Button>
                        </View>
                    </>
                </View>
            </View>
        );
    }
}

export default AddActionBloc;