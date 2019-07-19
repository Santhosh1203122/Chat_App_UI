import React from 'react';
import { connect } from 'react-redux';
import AuthenticationComponent from '../Components/authentication/authentication-component';
import PropTypes from 'prop-types'
import {getCurrentUser} from '../actions/loginAction';
import {withRouter} from 'react-router-dom'

class AuthemnticationContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {}
        }
    }
    checkLogin = (id) => {
        this.props.history.push("/message/?userId="+id)
    }
    render() {
        return (
            <AuthenticationComponent login={this.checkLogin}/>
        );
    }
}
AuthemnticationContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    userDetails: PropTypes.any
}

function mapStateToProps(state) {
    return {
        currentUserId: state.currentUserId,
    }
}

export default withRouter(connect(mapStateToProps)(AuthemnticationContainer));
