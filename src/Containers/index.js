import React from 'react';
import { connect, Provider } from 'react-redux';
import SideBarContainer from './side-bar-container'
import MessageAreaContainer from './message-area-container';
import PropTypes from 'prop-types'
import './index.scss';
import { initialAction } from '../actions/sideBaraction'
import { stat } from 'fs';

class WrapperContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {}
        }
    }
    componentDidMount() {
        this.props.dispatch(initialAction({ userId: this.props.currentUserId }));
    }
    componentWillReceiveProps(newProps) {
    }
    render() {
        return (
            <div className="wrapper">
                <div className="side-bar">
                    <SideBarContainer/>
                </div>
                <div className="main-area">
                    <MessageAreaContainer />
                </div>
            </div>
        );
    }
}
WrapperContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        currentUserId: state.currentUserId
    }
}

export default connect(mapStateToProps)(WrapperContainer);
