import React from 'react';
import PropTypes from 'prop-types'
import './message-content-component.scss';
import displayImage from '../../../Utils/inside_explosion_hd-wide-1.jpg'
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
        this.setState({conversations: newProps.conversations  });
    }

    generateMessageContent = (messages) => {
        return messages.map(message => {
            return <div className="message-content-holder">
                <div className="profile-img-holder">
                    <img src={displayImage} />
                </div>
                <div className="message-content">
                    <span className="user-name">{message.userName}</span>
                    <span>{new Date(message.time * 1000).toLocaleTimeString("en-US")} </span>
                    <p className="message">{message.message} </p>
                </div>

            </div>

        });
    }
    render() {
        return (
            <div>
                {this.generateMessageContent(this.state.conversations)}
            </div>

        );
    }
}

MessageContentComponent.propTypes = {
    conversations: PropTypes.array,
}