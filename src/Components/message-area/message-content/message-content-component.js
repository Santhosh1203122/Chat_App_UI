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
    }
    componentDidMount() {

    }
    componentWillReceiveProps(newProps) {
        this.setState({ conversations: newProps.conversations });
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
            return <div>
                {displayDate ? <div className="display-date">
                    <div className="date-border"></div>
                    <span>{currentMessageDate}</span>
                </div> : ''}
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
                {message.threads_count > 0 ? <div>{message.threads_count} Relpies</div> : ''}
            </div >

        }) : '';
    }
    render() {
        return (
            <div class="external-holder">
                {this.generateMessageContent(this.state.conversations)}
            </div>

        );
    }
}

MessageContentComponent.propTypes = {
    conversations: PropTypes.any,
    openThreadWindow: PropTypes.func,
    isTread: PropTypes.any
}