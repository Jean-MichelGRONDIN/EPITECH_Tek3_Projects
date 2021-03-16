import React from 'react';

import HarryPotterGetHouse from './HarryPotterGetHouse';
import HarryPotterListSpells from './HarryPotterListSpells';

import HarryPotterConfig from './HarryPotterConfig';

class HarryPotterWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instance: "gethouse",
            tab: [
                ["gethouse", "Get a House", <HarryPotterGetHouse key={0} />],
                ["listspells", "List all spells", <HarryPotterListSpells key={1} />]
            ],
            title: "Harry Potter Title"
        };
    }
    changeInstance(newInstance) {
        this.setState({instance: newInstance});
    }
    changeTitle(newTitle) {
        this.setState({title: newTitle});
    }
    render () {
        var part = [];
        this.state.tab.forEach(element => {
            if (this.state.instance === element[0]) {
                part.push(element[2]);
            }
        });
        if (part.length === 0) {
            part.push(<h1 key={1} >An error occured</h1>);
        }
        return (
            <div className="widgetBox backgroundColorWhite" >
                <div>
                    <h3 key={0} >{this.state.title}</h3>
                    <button key={1} onClick={() => this.props.selfDelete(this.props.myId)} >Delete</button>
                    <HarryPotterConfig key={2} confInstance={this.changeInstance.bind(this)}
                        title={this.state.title} confTitle={this.changeTitle.bind(this)}
                        configTab={this.state.tab} />
                </div>
                <div>
                    {part}
                </div>
            </div>
        );
    }
}

export default HarryPotterWidget;