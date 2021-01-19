import React from 'react';

class WidgetsAddWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgeIndex: [
                ["Harry Potter",  ["HarryPotterWidget"]],
                ["Weather", ["WeatherWidget"]],
                ["Spotify", ["SpotifyWidget"]],
                ["Microsoft", ["MicrosoftWidget"]],
                ["Youtube", ["YoutubeWidget"]],
                ["UselessFact", ["UselessFactWidget"]],
                ["ChuckNorris", ["ChuckNorrisWidget"]]
            ],
            selectedService: "Harry Potter",
            selectedWidget: "HarryPotterWidget"
        }
    }
    handleAdd() {
        this.props.addWidget(this.state.selectedWidget);
        this.props.closeWindow();
    }
    handleServiceChange(e) {
        var newDefaultWidget = "";
        this.state.widgeIndex.forEach(elem => {
            if (elem[0] === e.target.value) {
                newDefaultWidget = elem[1][0];
            }
        });
        this.setState({ selectedService: e.target.value, selectedWidget: newDefaultWidget });
    }
    render () {
        var services = [];
        let i = 0;
        let i2 = 0;
        var widgets = [];
        this.state.widgeIndex.forEach(elem => {
            i2 = 0;
            services.push(<option value={elem[0]} key={i} >{elem[0]}</option>)
            if (elem[0] === this.state.selectedService) {
                elem[1].forEach(element => {
                    widgets.push(<option value={element} key={i2} >{element}</option>)
                    i2++;
                });
            }
            i++;
        });
        return (
            <div className="widgetBox backgroundColorWhite" >
                <h3 key={0} >Add a widget</h3>
                <div>
                    <label htmlFor="servicelist">Choose a Service:</label>
                    <select id="servicelist" name="servicelist" onChange={ (e) => this.handleServiceChange(e) }>
                        {services}
                    </select>
                </div>
                <div>
                    <label htmlFor="widgetlist">Choose a widget to add:</label>
                    <select id="widgetlist" name="widgetlist" onChange={ (e) => this.setState({ selectedWidget: e.target.value }) }>
                        {widgets}
                    </select>
                </div>
                <div>
                    <button onClick={ () => this.props.closeWindow() } >Cancel</button>
                    <button onClick={ () =>  this.handleAdd()} >Save</button>
                </div>
            </div>
        );
    }
}

export default WidgetsAddWindow;