import React from 'react';

import AddActReacBloc from './AddActReacBloc';

class AddActReacButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
    }
    switchWindow() {
        this.setState({clicked: !this.state.clicked});
    }
    render () {
        if (this.state.clicked === false) {
            return (
                <button className="bouton_add_ar" onClick={() => this.switchWindow()} >+</button>
            );
        }
        return (
            <div className="act_reac_decay_windows" >
                <AddActReacBloc clientsids={this.props.clientsids} userinfos={this.props.userinfos} switchWindow={this.switchWindow.bind(this)} updateall={this.props.updateall} services={this.props.services} token={this.props.token} />
                <button className="bouton_add_ar bouton_add_ar_close" onClick={() => this.switchWindow()} >+</button>
            </div>
        );
    }
}

export default AddActReacButton;