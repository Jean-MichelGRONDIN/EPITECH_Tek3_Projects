import React from 'react';

import logo from '../assets/Logo.png';

import LoginForm from '../Components/AuthComponents/LoginForm';
import RegisterForm from '../Components/AuthComponents/RegisterForm';

class AuthPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: "login"
        }
    }
    changeForm(newaction) {
        this.setState({ form: newaction });
    }
    render () {
        var elem = [];
        if (this.state.form === "register") {
            elem.push(<RegisterForm changeForm={this.changeForm.bind(this)} key={1} />);
        } else {
            elem.push(<LoginForm clientsids={this.props.clientsids} changeForm={this.changeForm.bind(this)} key={2} />);
        }
        return (
            <div className="auth_container" >
                <div className="auth_left_block" >
                    <img src={logo} key={0} alt="Home" className="auth_logo" onClick={ () => window.location.replace("/")} />
                    <h1>AREA</h1>
                </div>
                {elem}
            </div>
        );
    }
}

export default AuthPages;