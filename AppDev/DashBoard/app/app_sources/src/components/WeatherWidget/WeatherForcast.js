import React from 'react';

class WeatherForcast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            weather: ""
        }
    }
    componentDidMount() {
        fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=70a718aeea4f4c45bd16b295e72d726e&lang=en&units=M&days=2")
        .then(res => res.json())
        .then(data => this.setState({data: data, weather: data.data[1]}));
    }
    render() {
        var weather = Object(this.state.weather.weather);
        return (
            <div>
                <h2>{"Weather forcast: " + this.state.data.city_name + " " + this.state.weather.datetime + " " + this.state.data.timezone}</h2>
                <p>{"Longitude: " + this.state.data.lon}</p>
                <p>{"Latitude: " + this.state.data.lat}</p>
                <p>{"Temperature: " + this.state.weather.temp}</p>
                <p>{"Weather: " + weather.description}</p>
                <p>{"U.V: " + this.state.weather.uv}</p>
                <p>{"Precipitation: " + this.state.weather.precip}</p>
            </div>
        );
    }
}

export default WeatherForcast