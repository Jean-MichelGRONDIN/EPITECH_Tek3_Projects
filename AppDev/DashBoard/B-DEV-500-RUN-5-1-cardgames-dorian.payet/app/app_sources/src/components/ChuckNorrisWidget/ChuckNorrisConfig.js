import React from 'react';

class ChuckNorrisConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            window: false,
            selected: "randomjoke",
            title: this.props.title
        };
    }
    changeWindow() {
        this.setState({ window: !this.state.window });
    }
    handleSave() {
        this.props.confInstance(this.state.selected);
        this.props.confTitle(this.state.title);
        this.changeWindow();
    }
    render () {
        var tmpConfigs = [];
        let i = 0;
        this.props.configTab.forEach(elem => {
            tmpConfigs.push(<option value={elem[0]} key={i} >{elem[1]}</option>);
            i++;
        });
        if (this.state.window === false) {
            return (
                <button onClick={ () => this.changeWindow() } >Config</button>
            );
        } else {
            return (
                <div>
                    <div>
                        <label htmlFor="configTitle">Choose a title:</label>
                        <input type="text" id="configTitle" name="configTitle"
                            onChange={ (e) => this.setState({ title: e.target.value }) }
                            value={this.state.title} />
                    </div>
                    <div>
                        <label htmlFor="instancelist">Select an instance:</label>
                        <select id="instancelist" name="instancelist"
                            value={this.state.selected} onChange={ (e) => this.setState({ selected: e.target.value }) }>
                            {tmpConfigs}
                        </select>
                    </div>
                    <button key={1} onClick={ () => this.handleSave() } >Save</button>
                    <button key={2} onClick={ () => this.changeWindow() } >x</button>
                </div>
            );
        }
    }
}

export default ChuckNorrisConfig;