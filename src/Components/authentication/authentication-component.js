import React from 'react';
import PropTypes from 'prop-types'
import './authentication-component.scss';

export default class AuthenticationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null
        }
    }
    storeUserId = (event) => {
        this.setState({userId: event.target.value});
    }
    login = () => {
        this.props.login(this.state.userId);
    }
    render() {
        return (
            <div className="authentication">
                <div className="authentication-form-login">
                    <h3>Login</h3>
                    <div className="input-holder">
                        <label>User Id</label>
                        <input  type="text" placeholder="User Id" onChange={this.storeUserId}/>
                    </div>
                    <div className="input-holder">
                        <label>Password</label>
                        <input type="password" placeholder="Password" />
                    </div>
                    <div >
                        <div className="button-holder">
                            <button type="button" className="btn custom-btn center-block" onClick={this.login}>Login</button>

                        </div>
                    </div>
                </div>
                <a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by designertale - www.freepik.com</a>
                <a href="https://www.freepik.com/free-photos-vectors/business">Business photo created by freepik - www.freepik.com</a>
            </div >

        );
    }
}

AuthenticationComponent.propTypes = {
    login: PropTypes.func
}