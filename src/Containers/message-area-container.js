import React from 'react';
import { connect } from 'react-redux';
import MessageAreaComponent from '../Components/message-area/message-area-component';
import PropTypes from 'prop-types';
import { sendIndividualMessage, sendThreadMessage, getThreadsHistroy } from '../actions/directMessageActions';
import { sendGroupMessage, updateGroup } from '../actions/groupMessageActions';
import io from 'socket.io-client';
import { searchUser } from '../actions/sideBaraction';

class MessageAreaContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conversations: [],
            currentUserId: null,
            selectedId: null,
            selectedMode: null,
            socket: '',
            userSuggestions: []
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(newProps) {
        if (newProps.conversations && this.props.conversations !== newProps.conversations) {
            this.setState({ conversations: newProps.conversations })
        }
        if (newProps.currentUserId) {
            this.setState({ currentUserId: newProps.currentUserId })
        }
        if (newProps.selectedId && this.props.selectedId !== newProps.selectedId) {
            this.setState({ selectedId: newProps.selectedId, selectedMode: newProps.selectedMode, socket: this.connect(newProps.selectedMode, newProps.selectedId) })
        }
        if (newProps.userSuggestions && this.props.userSuggestions !== newProps.userSuggestions) {
            this.setState({ userSuggestions: newProps.userSuggestions })
        }
        if (newProps.threads && this.props.threads !== newProps.threads) {
            this.setState({ threads: newProps.threads })
        }
    }

    connect = (selectedMode, selectedId) => {
        let nameSpaceID = ''
        if (selectedMode === 'Groups') {
            nameSpaceID = selectedMode + '/' + selectedId
        } else {
            nameSpaceID = 'Im' + '/' + (this.state.currentUserId < selectedId ? (this.state.currentUserId + ':' + selectedId) : (selectedId + ':' + this.state.currentUserId))
        }
        const conn = io.connect('http://localhost:3002/' + nameSpaceID);
        return conn;
    }
    sendMessage = (message, thread) => {
        if (thread) {
            const params = {
                id: thread.chat_id,
                time: parseInt((new Date().getTime() / 1000).toFixed(0)),
                fromUser: Number(this.state.currentUserId),
                message: message,
                userName: this.props.userDetails['user_name'],
                chat_type: this.state.selectedMode !== 'Groups' ? 'Im' : 'Groups',
                users_id: thread.users_id,
                group_id: thread.group_id
            }
            this.props.dispatch(sendThreadMessage(params));
        } else {
            const params = {
                type: this.state.selectedMode,
                id: this.state.selectedId,
                time: parseInt((new Date().getTime() / 1000).toFixed(0)),
                fromUser: this.state.currentUserId,
                message: message
            }
            if (this.state.selectedMode !== 'Groups') {
                params.id = this.state.currentUserId < this.state.selectedId ? this.state.currentUserId + ':' + this.state.selectedId : this.state.selectedId + ':' + this.state.currentUserId;
            }
            this.props.dispatch(this.state.selectedMode === 'Groups' ? sendGroupMessage(params) : sendIndividualMessage(params));
            params['userName'] = this.props.userDetails['user_name'];
            this.state.socket.emit('receive message', params);
        }
    }
    getUser = (searchString) => {
        this.props.dispatch(searchUser({ searchString }));
    }
    addUser = (members, groupName) => {
        this.props.dispatch(updateGroup({ id: this.state.selectedId, members, groupName }))
    }
    getThreadsHistroy = (message) => {
        const payloadData = { chat_id: message.chat_id, chat_type: (this.state.selectedMode !== 'Groups' ? 'Im' : 'Groups') }
        if(message.group_id) {
            payloadData['group_id'] = message.group_id;
        } else {
            payloadData['users_id'] = message.users_id;
        }   
        this.props.dispatch(getThreadsHistroy(payloadData));
    }
    render() {
        return (
            <MessageAreaComponent
                conversations={this.state.conversations}
                sendMessage={this.sendMessage}
                channelDetails={this.props.channelDetails}
                getUser={this.getUser}
                userSuggestions={this.state.userSuggestions}
                addUser={this.addUser}
                threads={this.state.threads}
                getThreadsHistroy={this.getThreadsHistroy}
            />
        );
    }


}
MessageAreaContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        conversations: state.conversations,
        threads: state.threads,
        currentUserId: state.currentUserId,
        selectedId: state.selectedId,
        selectedMode: state.selectedMode,
        userDetails: state.userDetails,
        channelDetails: state.channelDetails,
        userSuggestions: state.userSuggestions,
    }
}

export default connect(mapStateToProps)(MessageAreaContainer);
