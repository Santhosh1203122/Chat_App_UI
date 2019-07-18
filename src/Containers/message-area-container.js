import React from 'react';
import { connect } from 'react-redux';
import MessageAreaComponent from '../Components/message-area/message-area-component';
import PropTypes from 'prop-types';
import { sendIndividualMessage } from '../actions/directMessageActions';
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
    }
    // listenVal = (conn) => {
    //     conn.on('emit message', (msg) => {
    //         this.setState({ conversations: this.state.conversations.concat(msg) })
    //     });

    // }
    connect = (selectedMode, selectedId) => {
        let nameSpaceID = ''
        if (selectedMode === 'Groups') {
            nameSpaceID = selectedMode + '/' + selectedId
        } else {
            nameSpaceID = 'Im' + '/' + (this.state.currentUserId < selectedId ? (this.state.currentUserId + ':' + selectedId) : (selectedId + ':' + this.state.currentUserId))
        }
        const conn = io.connect('http://localhost:3002/' + nameSpaceID);
        // this.listenVal(conn);
        return conn;
    }
    sendMessage = (message) => {
        console.log(this.props.userDetails);
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
    getUser = (searchString) => {
        this.props.dispatch(searchUser({ searchString }));
    }
    addUser = (members, groupName) => {
        this.props.dispatch(updateGroup({ id: this.state.selectedId, members, groupName }))
    }
    render() {
        return (
            <MessageAreaComponent conversations={this.state.conversations} sendMessage={this.sendMessage} channelDetails={this.props.channelDetails} getUser={this.getUser} userSuggestions={this.state.userSuggestions} addUser={this.addUser} />
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
        selectedMode: state.selectedMode,
        userDetails: state.userDetails,
        channelDetails: state.channelDetails,
        userSuggestions: state.userSuggestions,
    }
}

export default connect(mapStateToProps)(MessageAreaContainer);
