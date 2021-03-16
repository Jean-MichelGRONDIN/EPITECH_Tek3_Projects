import React from 'react';

import logo from '../assets/Logo.png';
import user_picture from '../assets/Default_user_picture.png';

class ProfilePage extends React.Component {
    signOut() {
        localStorage.removeItem("areausertoken");
        window.location.replace("/");
    }
    render () {
        return (
            <div className="auth_container" >
                <div className="auth_left_block" >
                    <img src={logo} key={0} alt="Home" className="auth_logo" onClick={() => window.location.replace("/")} />
                    <h1 key={1} >AREA</h1>
                    <div className="username_profile" >
                        <h4 className="h4 user_name_text_profile" >{this.props.userinfos.username}</h4>
                    </div>
                    <img alt="" key={2} className="profile_page_picture" src={user_picture} />
                    <h4 key={3} className="h4 user_name_text_profile_2 little_font_w float_left" >Username: {this.props.userinfos.username}</h4>
                    <h4 key={4} className="h4 user_name_text_profile_3 little_font_w float_left" >Firstname: {this.props.userinfos.firstname}</h4>
                    <h4 key={5} className="h4 user_name_text_profile_4 little_font_w float_left" >Lastname: {this.props.userinfos.lastname}</h4>
                    <h4 key={6} className="h4 user_name_text_profile_5 little_font_w float_left" >Mail: {this.props.userinfos.email}</h4>
                    <div className="button_action_block" >
                        <button onClick={() => this.signOut()} className="auth_send_button manage_add_button button_add_act_reac_2" >Sign out</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilePage;