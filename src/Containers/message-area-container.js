import React from 'react';
import { connect } from 'react-redux';
import MessageAreaComponent from '../Components/message-area/message-area-component';
import PropTypes from 'prop-types';
import { sendIndividualMessage } from '../actions/directMessageActions';
import { sendGroupMessage } from '../actions/groupMessageActions';
import openSocket from 'socket.io-client';
const socket = openSocket('/my-namespace');

class MessageAreaContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conversations: [],
            currentUserId: null,
            selectedId: null,
            selectedMode: null
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.conversations && this.props.conversations !== newProps.conversations) {
            this.setState({ conversations: newProps.conversations })
        }
        if (newProps.currentUserId) {
            this.setState({ currentUserId: newProps.currentUserId })
        }
        if (newProps.selectedId && this.props.selectedId !== newProps.selectedId) {
            this.setState({ selectedId: newProps.selectedId, selectedMode: newProps.selectedMode })
        }
    }
    sendMessage = (message) => {
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
        socket.on('news', function (data) {
            console.log(data);
        });
        socket.emit('subscribeToTimer', 1000);
    }
    render() {
        return (
            <MessageAreaComponent conversations={this.state.conversations} sendMessage={this.sendMessage} />
        );
    }
}
MessageAreaContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        conversations: state.conversations,
        currentUserId: state.currentUserId,
        selectedId: state.selectedId,
        selectedMode: state.selectedMode
    }
}

export default connect(mapStateToProps)(MessageAreaContainer);
