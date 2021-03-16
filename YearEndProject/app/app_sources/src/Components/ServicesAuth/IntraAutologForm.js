import React from 'react'

class IntraAutologForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autologin: "",
        };
    }

    render() {
        return (
            <div>
                <div className="input_block" >
                    <label htmlFor="enterAutologin">Intranet Autologin</label>
                    <input type="text" id="enterAutologin" onChange={(e) => this.setState({ autologin: e.target.value})}/>
                </div>
                <div className="button_block" >
                    <button className="auth_send_button" id="sendAutologin" onClick={() => this.props.callBack(this.state.autologin)}>Send</button>
                </div>
            </div>
        );
    }
}

export default IntraAutologForm;