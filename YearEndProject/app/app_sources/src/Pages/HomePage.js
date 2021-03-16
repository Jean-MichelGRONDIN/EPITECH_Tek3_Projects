import React from 'react';

import Switch from "react-switch";

import logo from '../assets/Logo.png';
import user_picture from '../assets/Default_user_picture.png';
import arrow_white_bg from '../assets/arrow_white_bg.png';
import AddActReacButton from '../Components/AddActionReaction/AddActReacButton';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: null
        }
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
    fetchEnableActReac(myid, value) {
        if (this.checklinkedAccounts(myid) === false) {
            this.setState({ msg: <p key="error_msg" >Please link your services account on the page <a href="/authentication" >Authentification</a> before being able to start this Action Reaction !</p> })
        } else {
            fetch('http://localhost:8080/users/switchEnable', {
                method: 'post',
                body: 'elemid=' + myid + '&newvalue=' + value,
                headers: { 'Authorization': 'Bearer ' + this.props.token, 'Content-type': 'application/x-www-form-urlencoded' }
            })
            .then(res => res.json())
            .then(data => this.handleEnableActReac(data))
            .catch(err => console.log("Error on saving new action reaction: ", err));
        }
    }
    render() {
        var tmpmsg = [];
        var blockList = [];
        var tmpActReacList = this.props.userinfos.actionsreactions;
        tmpActReacList.forEach(elem => {
            if (elem.home === true) {
                blockList.push(
                    <div key={elem._id} className="act_react_block" >
                        <div className="act_react_left act_react_size" >
                            <h1 className="h1 text_blue" >Action</h1>
                            <h2 className="act_reac_name_block" >{elem.actionname}</h2>
                            <img alt="" className="arrow_img" src={arrow_white_bg} />
                        </div>
                        <div className="act_react_right act_react_size" >
                            <h1 className="h1 text_blue" >Reaction</h1>
                            <h2>{elem.reactionname}</h2>
                        </div>
                        <div>
                            <Switch className="switch_button" onColor="#7ed957" offColor="#ff5757" height={42} width={88} onChange={() => this.fetchEnableActReac(elem._id, !elem.enable)} checked={elem.enable} />
                        </div>
                    </div>
                );
            }
        });
        if (this.state.msg !== null) {
            tmpmsg.push(
                <div className="AddActReacErrorMsgBloc text_white" >{this.state.msg}</div>
                );
        }
        return (
            <div className="page_block" >
                <div className="page_header text_white" >
                    <div className="header_left" >
                        <div className="display_inline" >
                            <img src={logo} key={0} alt="Home" className="float_left logo" onClick={ () => window.location.replace("/")} />
                            <h1 key={1} className="h1 left_header_text big_font_w float_left" >AREA</h1>
                        </div>
                        <div className="menu" >
                            <a key={2} className="h1 left_header_text big_font_w text_white link_no_underline" href="/" >Home</a>
                            <a key={3} className="h1 left_header_text little_font_w text_white link_no_underline" href="/service" >Service</a>
                            <a key={4} className="h1 left_header_text little_font_w text_white link_no_underline" href="/authentication" >Authentication</a>
                        </div>
                    </div>
                    <div className="header_left header_right" >
                        <h4 key={0} className="h4 user_name_text little_font_w float_left" >{this.props.userinfos.username}</h4>
                        <img alt="" key={1} className="profile_picture" src={user_picture} onClick={ () => window.location.replace("/profile")} />
                    </div>
                </div>
                {tmpmsg}
                <div className="main_body" >
                    {blockList}
                    <AddActReacButton clientsids={this.props.clientsids} userinfos={this.props.userinfos} updateall={this.props.updateall} services={this.props.services} token={this.props.token} />
                </div>
            </div>
        );
    }
}

export default HomePage;