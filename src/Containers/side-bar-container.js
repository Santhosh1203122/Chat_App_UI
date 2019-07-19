import React from 'react';
import { connect } from 'react-redux';
import SideBarComponent from '../Components/side-bar/side-bar-component';
import PropTypes from 'prop-types'
import { getIndividualConversationHistory, sendImInvite, createImSucess } from '../actions/directMessageActions';
import { getGroupConversationHistory, createGroup, createGroupSucess } from '../actions/groupMessageActions';
import { setCurrentModeDetails, searchUser, getChannelDetails, updateUnreadDetails, pushMessage } from '../actions/sideBaraction';
import io from 'socket.io-client';

class SideBarContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: this.props.userDetails,
            userSuggestions: this.props.userSuggestions,
            socket: '',
            selectedMode: '',
            selectedId: '',
            unreadMessage: {}
        }
        this.connectedSockets = []
    }
    componentWillReceiveProps(newProps) {
        if (newProps.userDetails && newProps.userDetails !== this.props.userDetails) {
            this.setState({ userDetails: newProps.userDetails, socket: this.connectUser('User/' + newProps.userDetails.user_id) });
        }
        if (newProps.groups && newProps.groups !== this.props.groups) {
            this.createInitialConnection(newProps.groups, null);
        }
        if (newProps.directMessage && newProps.directMessage !== this.props.directMessage) {
            this.createInitialConnection(null, newProps.directMessage, newProps.userDetails.user_id || this.props.userDetails.user_id);
        }
        if (newProps.userSuggestions && this.props.userSuggestions !== newProps.userSuggestions) {
            this.setState({ userSuggestions: newProps.userSuggestions })
        }
        if (newProps.selectedId !== this.props.selectedId || newProps.selectedMode !== this.props.selectedMode) {
            this.setState({ selectedMode: newProps.selectedMode, selectedId: newProps.selectedId })
        }
        if (newProps.unreadMessage !== this.state.unreadMessage) {
            this.setState({ unreadMessage: newProps.unreadMessage });
        }
    }

    listenMessageVal = (conn) => {
        conn.on('emit message', (msgDetails) => {
            // this.setState({ conversations: this.state.conversations.concat(msg) })
            if (Number(msgDetails.fromUser) !== this.state.userDetails.user_id && ((this.state.selectedMode === 'Groups' && (this.state.selectedMode + this.state.selectedId) !== (msgDetails.type + msgDetails.id))
                || (this.state.selectedMode !== 'Groups' && (this.state.userDetails.user_id < this.state.selectedId ? (this.state.userDetails.user_id + ':' + this.state.selectedId) : (this.state.selectedId + ':' + this.state.userDetails.user_id)) !== msgDetails.id))) {
                this.props.dispatch(updateUnreadDetails({ id: msgDetails.type !== 'Groups' ? msgDetails.fromUser : msgDetails.id, mode: msgDetails.type }))
            } else if (Number(msgDetails.fromUser) !== this.state.userDetails.user_id) {
                this.props.dispatch(pushMessage(msgDetails));
            }
        });

    }
    createInitialConnection = (groups, directMessage, currentUserId) => {
        if (groups) {
            groups.forEach(group => {
                if (!this.connectedSockets.includes('Groups/' + group.group_id)) {
                    this.connectedSockets.push('Groups/' + group.group_id);
                    this.connect('Groups/' + group.group_id)
                }
            });
        }
        if (directMessage) {
            directMessage.forEach(user => {
                const nameSpaceID = 'Im' + '/' + (currentUserId < user.user_id ? (currentUserId + ':' + user.user_id) : (user.user_id + ':' + currentUserId));
                if (!this.connectedSockets.includes(nameSpaceID)) {
                    this.connectedSockets.push(nameSpaceID);
                    this.connect(nameSpaceID)
                }
            });
        }
    }
    connect = (nameSpaceID) => {
        const conn = io.connect('https://chat-app-server-full-stack.herokuapp.com:3002/' + nameSpaceID);
        this.listenMessageVal(conn);
        return conn;
    }


    listenVal = (conn) => {
        conn.on('Update New Group', (group) => {
            if (Number(group.created_by) !== this.state.userDetails.user_id) {
                this.props.dispatch(createGroupSucess(group));
            }
        });

        conn.on('Update New Im', (im) => {
            this.props.dispatch(createImSucess(im));
        });

    }
    connectUser = (nameSpaceID) => {
        const conn = io.connect('https://chat-app-server-full-stack.herokuapp.com:3002/' + nameSpaceID);
        this.listenVal(conn);
        return conn;
    }

    getConversationHistory = (id, type) => {
        this.props.dispatch(getChannelDetails({ type, id }));
        this.props.dispatch(type === 'Groups' ? getGroupConversationHistory({ id }) : getIndividualConversationHistory({ fromUser: this.state.userDetails.user_id, toUser: id }));
        this.props.dispatch(setCurrentModeDetails({ id, type }));
    }

    createGroup = (groupDetails) => {
        const groupPayload = {
            groupName: groupDetails.groupName,
            members: groupDetails.members.concat(Number(this.props.currentUserId)),
            time: parseInt((new Date().getTime() / 1000).toFixed(0)),
            createdBy: this.props.currentUserId
        };
        this.props.dispatch(createGroup(groupPayload));
    }
    getUser = (searchString) => {
        this.props.dispatch(searchUser({ searchString }));
    }

    sendInvite = (inviteDetails) => {
        const imPayload = {
            toUser: inviteDetails.toUser,
            time: parseInt((new Date().getTime() / 1000).toFixed(0)),
            fromUser: this.props.currentUserId
        };
        this.props.dispatch(sendImInvite(imPayload));
        imPayload['userName'] = this.props.userDetails['user_name'];
        // this.state.socket.emit('Update New Im', imPayload);
    }

    render() {
        return (
            <SideBarComponent
                userDetails={this.state.userDetails}
                groups={this.props.groups}
                directMessage={this.props.directMessage}
                threads={this.state.threads}
                getConversationHistory={this.getConversationHistory}
                createGroup={this.createGroup}
                sendInvite={this.sendInvite}
                getUser={this.getUser}
                userSuggestions={this.state.userSuggestions}
                unreadMessage={this.props.unreadMessage}
            />
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
        userSuggestions: state.userSuggestions,
        selectedId: state.selectedId,
        selectedMode: state.selectedMode,
        unreadMessage: state.unreadMessage
    }
}

export default connect(mapStateToProps)(SideBarContainer);
