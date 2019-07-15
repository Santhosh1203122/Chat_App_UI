import React from 'react';
import { connect } from 'react-redux';
import MessageAreaComponent from '../Components/message-area/message-area-component';
import PropTypes from 'prop-types'
import { sendIndividualMessage } from '../actions/directMessageActions'
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
            id: this.selectedId,
            time: parseInt((new Date().getTime() / 1000).toFixed(0)),
            fromUser: this.state.currentUserId,
            message: message
        }
        if (this.selectedMode !== 'Groups') {
            params.id = this.state.currentUserId < this.state.selectedId ? this.state.currentUserId + ':' + this.state.selectedId : this.state.selectedId + ':' + this.state.currentUserId;
        }
        this.props.dispatch(sendIndividualMessage(params))
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
