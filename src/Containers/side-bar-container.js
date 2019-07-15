import React from 'react';
import { connect } from 'react-redux';
import SideBarComponent from '../Components/side-bar/side-bar-component';
import PropTypes from 'prop-types'
import { getIndividualConversationHistory } from '../actions/directMessageActions';
import { getGroupConversationHistory, createGroup } from '../actions/groupMessageActions';
import { setCurrentModeDetails } from '../actions/sideBaraction';
class SideBarContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: this.props.userDetails
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.userDetails) {
            this.setState({ userDetails: newProps.userDetails });
        }
    }
    getConversationHistory = (id, type) => {
        this.props.dispatch(type === 'Groups' ? getGroupConversationHistory({ id }) : getIndividualConversationHistory({ fromUser: 1, toUser: id }));
        this.props.dispatch(setCurrentModeDetails({ id, type }));
    }
    createGroup = (groupDetails) => {
        const groupPayload = {
            groupName: groupDetails.groupName,
            members: groupDetails.members.concat(this.props.currentUserId), 
            time: parseInt((new Date().getTime() / 1000).toFixed(0)), 
            createdBy: this.props.currentUserId
        };
        this.props.dispatch(createGroup(groupPayload));
    }
    render() {
        return (
            <SideBarComponent userDetails={this.state.userDetails} groups={this.props.groups} directMessage={this.props.directMessage} threads={this.state.threads} getConversationHistory={this.getConversationHistory} createGroup={this.createGroup} />
        );
    }
}
SideBarContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails,
        groups: state.groups,
        directMessage: state.directMessage,
        threads: state.threads,
        currentUserId: state.currentUserId,
    }
}

export default connect(mapStateToProps)(SideBarContainer);
