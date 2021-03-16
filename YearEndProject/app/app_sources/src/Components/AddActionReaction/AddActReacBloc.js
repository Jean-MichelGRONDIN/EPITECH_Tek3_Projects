import React from 'react';

import arrow_blue_bg from '../../assets/arrow_blue_bg.png';

import CheckAuth from "../ServicesAuth/CheckAuth";

class AddActionBloc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectServiceLeft: "",
            selectServiceRight: "",
            selectedAction: "",
            selectedReaction: "",
            checkAuthRight: false,
            checkAuthLeft: false
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
            selectedReaction: tmpSelectedReaction
        })
    }
    handleSaveActReac(data) {
        this.props.updateall();
        this.props.switchWindow();
    }
    updateone() {
        this.setState({checkAuthRight: false});
        if (this.state.checkAuthLeft === false) {
            this.props.updateall()
        }
    }
    updatetwo() {
        this.setState({checkAuthLeft: false});
        this.props.updateall()
    }
    SaveNewActReac() {
        var linked_account = this.props.userinfos.accounts;
        var right = "";
        var left = "";
        linked_account.forEach(elem => {
            if (this.state.selectServiceRight._id == elem.sericeid) {
                right = "OK"
            } if (this.state.selectServiceLeft._id == elem.sericeid) {
                left = "OK"
            }
        });
        if (this.state.selectServiceRight.servicename === "NASA" || this.state.selectServiceRight.servicename === "OpenWeather") {
            right = "OK"
        }
        if (this.state.selectServiceLeft.servicename === "NASA" || this.state.selectServiceLeft.servicename === "OpenWeather") {
            left = "OK"
        }
        if (right === "" || left === "") {
            if (right === "") {
                this.setState({checkAuthRight: true});
            }
            if (left === "" && this.state.selectServiceRight._id != this.state.selectServiceLeft._id) {
                this.setState({checkAuthLeft: true});
            }
        } else {
            fetch('http://localhost:8080/users/addservicesActReact', {
                method: 'post',
                body: 'actionid=' + this.state.selectedAction._id + '&reactionid=' + this.state.selectedReaction._id,
                headers: { 'Authorization': 'Bearer ' + this.props.token, 'Content-type': 'application/x-www-form-urlencoded' }
            })
            .then(res => res.json())
            .then(data => this.handleSaveActReac(data))
            .catch(err => console.log("Error on saving new action reaction: ", err));
        }
    }
    render() {
        if (this.state.selectServiceLeft === "" || this.state.selectServiceRight === "" || this.state.selectedAction._id === "" || this.state.selectedReaction._id === "") {
            return(<h1></h1>);
        }
        var options = [];
        var optionsreaction = [];
        var tmp_tab = this.props.services;
        let i = 0;
        tmp_tab.forEach(elem => {
            if (elem.actions.length !== 0) {
                options.push(<option key={elem.servicename} value={i}>{elem.servicename}</option>)
            }
            if (elem.reactions.length !== 0) {
                optionsreaction.push(<option key={elem.servicename} value={i}>{elem.servicename}</option>)
            }
            i++;
        });

        var linked_account = this.props.userinfos.accounts;
        if (this.state.checkAuthRight !== false || this.state.checkAuthLeft !== false) {
            var elem_right = <CheckAuth updateall={this.updateone.bind(this)} clientsids={this.props.clientsids} servicename={this.state.selectServiceRight.servicename} token={this.props.token}></CheckAuth>
            var elem_left = <CheckAuth clientsids={this.props.clientsids} updateall={this.updatetwo.bind(this)} servicename={this.state.selectServiceLeft.servicename} token={this.props.token}></CheckAuth>
            linked_account.forEach(elem => {
                if (this.state.selectServiceRight.servicename === elem || this.state.selectServiceRight.servicename === "NASA" || this.state.selectServiceRight.servicename === "OpenWeather") {
                    elem_right = ""
                } if (this.state.selectServiceLeft.servicename === elem || this.state.selectServiceLeft.servicename === "NASA" || this.state.selectServiceLeft.servicename === "OpenWeather") {
                    elem_left = ""
                }
            });
            if (elem_right !== "" && elem_left !== "" && this.state.selectServiceLeft.servicename === this.state.selectServiceRight.servicename) {
                elem_left = ""
            }
        }
        if (this.state.checkAuthLeft === false) {
            elem_left = ""
        }
        if (this.state.checkAuthRight === false) {
            elem_right = ""
        }
        var actions_tab = [];
        var tmp_action_tab = this.state.selectServiceLeft.actions;
        tmp_action_tab.forEach(elem => {
            if (this.state.selectedAction._id === elem._id) {
                actions_tab.push(<h1 onClick={ () => this.setState({selectedAction: elem}) } key={elem.name} className="h2 text_black tableunderligne" >{elem.name}</h1>)
            } else {
                actions_tab.push(<h1 onClick={ () => this.setState({selectedAction: elem}) } key={elem.name} className="h2 text_white tableunderligne" >{elem.name}</h1>)
            }
        });
        var reactions_tab = [];
        var tmp_reaction_tab = this.state.selectServiceRight.reactions;
        tmp_reaction_tab.forEach(elem => {
            if (this.state.selectedReaction._id === elem._id) {
                reactions_tab.push(<h1 onClick={ () => this.setState({selectedReaction: elem}) } key={elem.name} className="h2 text_black tableunderligne" >{elem.name}</h1>)
            } else {
                reactions_tab.push(<h1 onClick={ () => this.setState({selectedReaction: elem}) } key={elem.name} className="h2 text_white tableunderligne" >{elem.name}</h1>)
            }
            });


        return (
            <div className="add_action_block" >
                <div className="add_action_size" >
                    <h1 className="h1 text_white tableunderligne" >Add action</h1>
                    <div className="add_action_block_two" >
                        <div className="add_action_size">
                            <select onChange={ (e) => this.setState({ selectServiceLeft: this.props.services[e.target.value], selectedAction: this.props.services[e.target.value].actions[0] })} >
                                {options}
                            </select>
                            {actions_tab}
                        </div>
                    </div>
                    <div>
                        <img alt="" className="arrow_img arrow_img_actreac" src={arrow_blue_bg} />
                    </div>
                    <div className="add_action_block_two pos_block_right" >
                        <div className="add_action_size">
                            <select onChange={ (e) => this.setState({ selectServiceRight: this.props.services[e.target.value], selectedReaction: this.props.services[e.target.value].reactions[0] })} >
                                {optionsreaction}
                            </select>
                            {reactions_tab}
                        </div>
                    </div>
                </div>
                <div className="act_react_right act_react_size" >
                    <h1>
                        <div className="button_action_block" >
                            <button className="auth_send_button manage_add_button button_add_act_reac" onClick={ () => this.SaveNewActReac()} >Add</button>
                        </div>
                    </h1>
                </div>
                {elem_right}
                {elem_left}
            </div>
        );
    }
}

export default AddActionBloc;