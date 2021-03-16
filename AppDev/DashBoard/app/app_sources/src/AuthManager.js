import React from 'react';

import AuthPages from './pages/AuthPages'
import MainRoutesManager from './MainRoutesManager';

class AuthManagers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("jmdashboardtoken")
        }
    }
    render () {
        if (this.state.token === null) {
            return (
                <div>
                    <AuthPages />
                </div>
            );
        } else {
            return (
                <div>
                    <MainRoutesManager token={this.state.token}/>
                </div>
            );
        }
    }
}

export default AuthManagers;