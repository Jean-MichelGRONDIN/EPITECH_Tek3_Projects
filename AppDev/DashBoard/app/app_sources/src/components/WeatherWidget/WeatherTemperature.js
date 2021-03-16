import React from 'react';

class WeatherTemperature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ""
        }
    }
    componentDidMount() {
        fetch("https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=$MY_CLIENT_KEY&lang=en&units=M")
        .then(res => res.json())
        .then(data => this.setState({data: data.data[0]}));
    }
    render() {
        var weather = Object(this.state.data.weather);
        return (
            <div>
                <h2>{"Current weather: " + this.state.data.city_name + " " + this.state.data.datetime + " " + this.state.data.timezone}</h2>
                <p>{"Longitude: " + this.state.data.lon}</p>
                <p>{"Latitude: " + this.state.data.lat}</p>
                <p>{"Temperature: " + this.state.data.app_temp}</p>
                <p>{"Weather: " + weather.description}</p>
                <p>{"U.V: " + this.state.data.uv}</p>
                <p>{"Precipitation: " + this.state.data.precip}</p>
            </div>
        );
    }
}

export default WeatherTemperature