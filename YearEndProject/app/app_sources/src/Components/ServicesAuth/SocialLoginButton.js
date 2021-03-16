import React from 'react'
import SocialLogin from 'react-social-login'

class SocialLoginButton extends React.Component {

    render() {
        return (
            <button onClick={this.props.triggerLogin} {...this.props}>
                { this.props.children }
            </button>
        );
    }
}

export default SocialLogin(SocialLoginButton);