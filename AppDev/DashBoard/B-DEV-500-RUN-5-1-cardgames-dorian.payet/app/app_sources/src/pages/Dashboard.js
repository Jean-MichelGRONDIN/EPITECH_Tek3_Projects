import React from 'react';

import logoutImage from '../assets/logout.png';

import WidgetPanel from '../components/WidgetPanel';
import UserSettings from '../components/UserSettings';

class PanelNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "panel",
            elems: [
                ["panel", "Panel", <WidgetPanel key={0} />],
                ["settings", "Settings", <UserSettings key={2} />]
            ]
        }
    }
    Logout() {
        localStorage.removeItem("jmdashboardtoken");
        window.location.replace("/");
    }
    render () {
        var tab = [];
        var page = [];
        let i = 1;
        this.state.elems.forEach(element => {
            if (this.state.selected === element[0]) {
                tab.push(<button className="w3-bar-item w3-button navbarButton" disabled={true} key={i}
                onClick={ () => this.setState({selected: element[0]}) } >{element[1]}</button>);
                page.push(element[2]);
            } else {
                tab.push(<button className="w3-bar-item w3-button navbarButton" key={i}
                    onClick={ () => this.setState({selected: element[0]}) } >{element[1]}</button>);
            }
            i++;
        });
        return (
            <div>
                <div className="w3-sidebar w3-light-grey w3-bar-block navbar-custom" key={0} >
                    <div className="inlineBlock" >
                        <h3 className="navbarTopLeft navbarTitle" key={0} >Dashboard</h3>
                        <img className="navabarTopRight navbarImage" src={logoutImage} key={1} alt="Logout" onClick={ () => this.Logout()} />
                    </div>
                    {tab}
                </div>
                <div className="dasboard-page" key={1} >
                    {page}
                </div>
            </div>
        );
    }
}

export default PanelNavBar;