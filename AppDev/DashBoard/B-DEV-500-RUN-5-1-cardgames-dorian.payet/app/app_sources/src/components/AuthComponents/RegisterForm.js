import React from 'react';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
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
        if (this.state.email === "") {
            this.setState({msg: "Please enter a valid email"})
            return;
        }
        if (this.state.password === "") {
            this.setState({msg: "Please enter a password"})
            return;
        }
        fetch('http://localhost:3030/register', {
            method: 'post',
            body: 'username=' + this.state.username +'&email=' + this.state.email +'&password=' + this.state.password,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        })
        .then(res => res.json())
        .then(data => this.handleResponse(data))
        .catch(err => console.log("Error on fetching to register: ", err));
    }
    render () {
        var msg = [];
        if (this.state.msg !== "") {
            msg.push(<h4 className="infoBox" name="authInfos" id="authInfos" key={1} >{this.state.msg}</h4>);
        }
        if (this.state.finish === true) {
            return (
                <div>
                    <h1 className="colorWhite" name="authTitle" id="authTitle">Registration successful please log in to continue</h1>
                    <button className="btn colorbouton colorWhite" name="authSwitchPage" id="authSwitchPage" onClick={() => this.props.changeForm("login")}>Log in page</button>
                </div>
            );
        } else {
            return (
                <div className="authContainer">
                    <div>
                        <h1 className="colorWhite" name="authTitle" id="authTitle">Please register to the platform</h1>
                        {msg}
                        <div className="form-group" >
                            <label className="colorWhite" htmlFor="authUsername">Username:</label>
                            <input className="form-control" placeholder="Username" type="text" name="authUsername" id="authUsername" onChange={(e) => this.setState({ username: e.target.value})}/>
                        </div>
                        <div className="form-group" >
                            <label className="colorWhite" htmlFor="email">Email:</label>
                            <input className="form-control" placeholder="Email" type="email" name="email" id="email" onChange={(e) => this.setState({ email: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label className="colorWhite" htmlFor="authPassword">Password:</label>
                            <input className="form-control" placeholder="Password" type="password" name="authPassword" id="authPassword" onChange={(e) => this.setState({ password: e.target.value})}/>
                        </div>
                        <button className="btn colorbouton colorWhite" name="authSubmitButton" id="authSubmitButton" onClick={() => this.fetchNewUser()}>Register</button>
                    </div>
                    <div>
                        <label className="colorWhite paddingRigthTwo" htmlFor="authSwitchPage">Already registered ? </label>
                        <button className="btn colorbouton colorWhite" name="authSwitchPage" id="authSwitchPage" onClick={() => this.props.changeForm("login")}>Log in</button>
                    </div>
                </div>
            );
        }
    }
}

export default RegisterForm;