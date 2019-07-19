import React from 'react';
import PropTypes from 'prop-types'
import './message-content-component.scss';
import displayImage from '../../../Utils/user-1.png'
export default class MessageContentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conversations: []
        }
        this.messagesEnd = ''
    }
    // componentDidUpdate(update) {
    //     if(update.conversations && update.conversations !== )
    //     this.scrollToBottom();
    // }
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView();
    }
    componentWillReceiveProps(newProps) {
        if (newProps.conversations && this.props.conversations !== newProps.conversations) {
            this.setState({ conversations: newProps.conversations }, () => {
                this.scrollToBottom();
            });
        }
    }
    createThread = (message) => {
        this.props.openThreadWindow(message)
    }

    generateMessageContent = (messages) => {
        let lastDate = ''
        return messages ? messages.map(message => {
            const currentMessageDate = new Date(message.time * 1000).toLocaleDateString("en-US");
            const displayDate = lastDate !== currentMessageDate ? true : false;
            lastDate = displayDate ? currentMessageDate : lastDate;
            return <div className="message-wrapper" >
                {displayDate ? <div className="display-date">
                    <div className="date-border"></div>
                    <span>{currentMessageDate}</span>
                </div> : ''}
                <div >
                    <div className="message-content-holder">

                        <div className="profile-img-holder">
                            <img src={displayImage} />
                        </div>
                        <div className="message-content">
                            <span className="user-name">{message.userName || message.user_name}</span>
                            <span>{new Date(message.time * 1000).toLocaleTimeString("en-US")} </span>
                            {this.props.isTread ? '' : <i class="far fa-comment-dots reply" onClick={() => this.createThread(message)}></i>}
                            <p className="message">{message.message} </p>
                        </div>

                    </div>
                    {message.threads_count > 0 ? <div className="threads-count" onClick={() => this.createThread(message)}>
                        <img src={displayImage} />
                        <span className="no-of-replies">{message.threads_count} Relpies</span>
                        <span className="view-threads">View threads</span>
                        <i class="fas fa-chevron-right"></i>
                    </div> : ''}
                </div>
            </div >

        }) : '';
    }
    render() {
        return (
            <div class="external-holder" id="out1">
                {this.generateMessageContent(this.state.conversations)}
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}></div>
            </div>

        );
    }
}

MessageContentComponent.propTypes = {
    conversations: PropTypes.any,
    openThreadWindow: PropTypes.func,
    isTread: PropTypes.any
}