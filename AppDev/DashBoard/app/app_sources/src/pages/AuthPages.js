import React from 'react';

import LoginForm from '../components/AuthComponents/LoginForm';
import RegisterForm from '../components/AuthComponents/RegisterForm';

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
            elem.push(<LoginForm changeForm={this.changeForm.bind(this)} key={2} />);
        }
        return (
            <div>
                <h1 className="authMainTitleClass" name="authMainTitle" id="authMainTitle" key={0} >Dashboard</h1>
                {elem}
            </div>
        );
    }
}

export default AuthPages;