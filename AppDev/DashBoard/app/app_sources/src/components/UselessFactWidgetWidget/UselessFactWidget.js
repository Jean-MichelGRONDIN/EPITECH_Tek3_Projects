import React from 'react';

import UselessFact from './UselessFact';

import UselessFactConfig from './UselessFactConfig';

class UselessFactWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instance: "uselessfacts",
            tab: [
                ["uselessfacts", "Get random useless fact", <UselessFact key={0} />]
            ],
            title: "Useless Facts Title"
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
                    <UselessFactConfig key={2} confInstance={this.changeInstance.bind(this)}
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

export default UselessFactWidget;