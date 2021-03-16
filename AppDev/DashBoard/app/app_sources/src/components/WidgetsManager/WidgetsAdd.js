import React from 'react';

import WidgetsAddWindow from './WidgetsAddWindow';

class WidgetsAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            window: false
        }
    }
    windowChange() {
        this.setState({window: !this.state.window});
    }
    render () {
        var tmp = null;
        if (this.state.window === false) {
            tmp = <button onClick={ () => this.windowChange() } key={0} >+</button>;
        } else {
            tmp = <WidgetsAddWindow closeWindow={this.windowChange.bind(this)} addWidget={this.props.addWidget} key={1} />
        }
        return (
            <div>
                {tmp}
            </div>
        );
    }
}

export default WidgetsAdd;