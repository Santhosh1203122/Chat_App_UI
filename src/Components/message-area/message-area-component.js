import React from 'react';
import PropTypes from 'prop-types'
import './message-area-component.scss';
import DetailsBarComponent from './details-bar/details-bar-componet';
import MessageContentComponent from './message-content/message-content-component';

export default class MessageAreaComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conversations: [],
            userSuggestions: []
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.conversations) {
            this.setState({ conversations: newProps.conversations });
        }
        if (newProps.userSuggestions && newProps.userSuggestions !== this.userSuggestions) {
            this.setState({ userSuggestions: newProps.userSuggestions });
        }
    }
    sendMessage = (event) => {
        if (event.key === 'Enter') {
            this.props.sendMessage(event.target.value);
            event.target.value = ''
        }
    }


    render() {
        return (
            this.props.channelDetails ?
                <div className="message-area">
                    <DetailsBarComponent channelDetails={this.props.channelDetails} getUser={this.props.getUser} userSuggestions={this.state.userSuggestions} addUser={this.props.addUser} />
                    <div className="message-display-area">
                        <MessageContentComponent conversations={this.state.conversations} />
                    </div>
                    <div className="message-entry-area">
                        <input placeholder="Enter Messge here" onKeyDown={this.sendMessage} />
                    </div>
                </div> : ''
        );
    }
}

MessageAreaComponent.propTypes = {
    conversations: PropTypes.array,
    sendMessage: PropTypes.func,
    details: PropTypes.any,
    channelDetails: PropTypes.any,
    getUser: PropTypes.func,
    userSuggestions: PropTypes.any,
    addUser: PropTypes.func
}