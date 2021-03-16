import React from 'react';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            msg: "",
            finish: false
        };
    }
    handleResponse(res) {
        if (res.type === "ok") {
            this.setState({msg: "", finish: true});
        } else {
            this.setState({msg: "Registration failed because:" + res.msg});
        }
    }
    fetchNewUser() {
        if (this.state.username === "") {
            this.setState({msg: "Please enter a username"})
            return;
        }
        if (this.state.firstname === "") {
            this.setState({msg: "Please enter a firstname"})
            return;
        }
        if (this.state.lastname === "") {
            this.setState({msg: "Please enter a lastname"})
            return;
        }
        if (this.state.email === "") {
            this.setState({msg: "Please enter a valid email"})
            return;
        }
        if (this.state.password === "") {
            this.setState({msg: "Please enter a password"})
            return;
        }
        fetch('http://localhost:8080/register', {
            method: 'post',
            body: 'username=' + this.state.username + '&firstname=' + this.state.firstname + '&lastname=' + this.state.lastname + '&email=' + this.state.email + '&password=' + this.state.password,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        })
        .then(res => res.json())
        .then(data => this.handleResponse(data))
        .catch(err => console.log("Error on fetching to register: ", err));
    }
    render () {
        var msg = [];
        if (this.state.msg !== "") {
            msg.push(<h4 key={1} >{this.state.msg}</h4>);
        }
        if (this.state.finish === true) {
            return (
                <div className="auth_block" >
                    <h1 className="text_blue" key={0} >Registration successful please log in to continue</h1>
                    <div className="button_block" >
                        <button className="auth_send_button" name="authSwitchPage" id="authSwitchPage" onClick={() => this.props.changeForm("login")}>Sign In</button>
                    </div>
                </div>
            );
        } else {
            return (
                    <div className="auth_block" >
                        <h1 className="text_blue" key={0} >Register</h1>
                        {msg}
                        <div className="input_block" >
                            <label htmlFor="authUsername">Username:</label>
                            <input type="text" id="authUsername" onChange={(e) => this.setState({ username: e.target.value})}/>
                        </div>
                        <div className="input_block" >
                            <label htmlFor="authFirstname">Firstname:</label>
                            <input type="text" id="authFirstname" onChange={(e) => this.setState({ firstname: e.target.value})}/>
                        </div>
                        <div className="input_block" >
                            <label htmlFor="authLastname">Lastname:</label>
                            <input type="text" id="authLastname" onChange={(e) => this.setState({ lastname: e.target.value})}/>
                        </div>
                        <div className="input_block" >
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" onChange={(e) => this.setState({ email: e.target.value})}/>
                        </div>
                        <div className="input_block" >
                            <label htmlFor="authPassword">Password:</label>
                            <input type="password" id="authPassword" onChange={(e) => this.setState({ password: e.target.value})}/>
                        </div>
                        <div className="button_block" >
                            <button className="auth_send_button" id="authSubmitButton" onClick={() => this.fetchNewUser()}>Register</button>
                        </div>
                        <div className="button_block" >
                            <button className="auth_second_button" id="authSwitchPage" onClick={() => this.props.changeForm("login")}>Log in</button>
                        </div>
                    </div>
            );
        }
    }
}

export default RegisterForm;