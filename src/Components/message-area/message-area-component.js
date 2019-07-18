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
            userSuggestions: [],
            messageWindowWidth: '87%',
            threadDetails: null,
            threads: []
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.conversations) {
            this.setState({ conversations: newProps.conversations });
        }
        if (newProps.userSuggestions && newProps.userSuggestions !== this.userSuggestions) {
            this.setState({ userSuggestions: newProps.userSuggestions });
        }
        if (newProps.threads && this.props.threads !== newProps.threads) {
            this.setState({ threads: newProps.threads })
        }
    }
    sendMessage = (event) => {
        if (event.key === 'Enter') {
            this.props.sendMessage(event.target.value);
            event.target.value = ''
        }
    }

    openThreadWindow = (message) => {
        this.props.getThreadsHistroy(message);
        this.setState({ messageWindowWidth: '65%', threadDetails: message });
       
    }

    sendThreadMessage = (event) => {
        if (event.key === 'Enter') {
            this.props.sendMessage(event.target.value, this.state.threadDetails);
            event.target.value = ''
        }
    }

    render() {
        return (
            this.props.channelDetails ?
                <div className="message-area">
                    <DetailsBarComponent channelDetails={this.props.channelDetails} getUser={this.props.getUser} userSuggestions={this.state.userSuggestions} addUser={this.props.addUser} />

                    <div className="message-display-area" style={{ width: this.state.messageWindowWidth }}>
                        <MessageContentComponent conversations={this.state.conversations} openThreadWindow={this.openThreadWindow} />
                    </div>
                    <div className="message-entry-area" style={{ width: this.state.messageWindowWidth }}>
                        <input placeholder="Enter Messge here" onKeyDown={this.sendMessage} />
                    </div>
                    {
                        this.state.messageWindowWidth === '65%' ? <div class="thread-area">
                            <div className="thread-header">
                                <span>Threads</span>
                                <p>{this.state.threadDetails.userName}</p>
                                <i class="fas fa-times" onClick={() => this.setState({ messageWindowWidth: '87%' })}></i>
                            </div>
                            <div className="threads-message-holder">
                                <MessageContentComponent conversations={this.state.threads} isTread={true}/>
                            </div>
                            <div className="thread-entry-area" >
                                <input placeholder="Enter Messge here" onKeyDown={this.sendThreadMessage} />
                            </div>
                        </div> : ''
                    }

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
    addUser: PropTypes.func,
    threads: PropTypes.any,
    getThreadsHistroy: PropTypes.func
}