import React from 'react';

import HarryPotterWidget from './HarryPotterWidget/HarryPotterWidget';
import WeatherWidget from './WeatherWidget/WeatherWidget';
import SpotifyWidget from './SpotifyWidget/SpotifyWidget';
import MicrosoftWidget from './MicrosoftWidget/MicrosoftWidget';
import YoutubeWidget from './YoutubeWidget/YoutubeWidget';
import UselessFactWidget from './UselessFactWidgetWidget/UselessFactWidget';
import ChuckNorrisWidget from './ChuckNorrisWidget/ChuckNorrisWidget'

import WidgetsAdd from './WidgetsManager/WidgetsAdd';

class WidgetPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: [],
            nb: 0,
            nextId: 0,
            nextkey : 0
        }
    }
    deleteWidget(idToDelete) {
        var newTab = [];
        this.state.tab.forEach(elem => {
            if (elem[0] !== idToDelete) {
                newTab.push(elem);
            }
        });
        this.setState({ tab: newTab , nb: (newTab.length) });
    }
    getWidget(name, i) {
        switch (name) {
            case "HarryPotterWidget":
                return (<HarryPotterWidget myId={this.state.nextId} key={this.state.nextkey} selfDelete={this.deleteWidget.bind(this)} />);
            case "WeatherWidget":
                return (<WeatherWidget myId={this.state.nextId} key={this.state.nextkey} selfDelete={this.deleteWidget.bind(this)} />);
            case "SpotifyWidget":
                return (<SpotifyWidget myId={this.state.nextId} key={this.state.nextkey} selfDelete={this.deleteWidget.bind(this)} />);
            case "MicrosoftWidget":
                return (<MicrosoftWidget myId={this.state.nextId} key={this.state.nextkey} selfDelete={this.deleteWidget.bind(this)} />);
            case "YoutubeWidget":
                return (<YoutubeWidget myId={this.state.nextId} key={this.state.nextkey} selfDelete={this.deleteWidget.bind(this)} />);
            case "UselessFactWidget":
                return (<UselessFactWidget myId={this.state.nextId} key={this.state.nextkey} selfDelete={this.deleteWidget.bind(this)} />);
            case "ChuckNorrisWidget":
                return (<ChuckNorrisWidget myId={this.state.nextId} key={this.state.nextkey} selfDelete={this.deleteWidget.bind(this)} />);
            default:
                return (null);
        }
    }
    addWidget(widgetName) {
        var newElem = [];
        newElem.push(this.state.nextId);
        newElem.push(this.getWidget(widgetName, this.state.tab.length));

        var newTab = [];
        this.state.tab.forEach(elem => {
            newTab.push(elem);
        });
        newTab.push(newElem);

        this.setState({ tab: newTab,
            nb: (this.state.tab.length + 1),
            nextId: (this.state.nextId + 1),
            nextkey: (this.state.nextkey + 1)
        });
    }
    render () {
        return (
            <div>
                <WidgetsAdd key="start" addWidget={this.addWidget.bind(this)} />
                {this.state.tab}
            </div>
        );
    }
}

export default WidgetPanel;