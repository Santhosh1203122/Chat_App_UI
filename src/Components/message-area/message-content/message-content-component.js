import React from 'react';
import PropTypes from 'prop-types'
import './message-content-component.scss';
import displayImage from '../../../Utils/inside_explosion_hd-wide-1.jpg'
export default class MessageContentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoList: [],
            isLastSetOfData: false,
            lastPageRequested: 1
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(newProps) {
        // this.setState({  });
    }

    generateMessageContent = (messages) => {
        return messages.map(message => {
            return <div className="message-content-holder">
                <div className="profile-img-holder">
                    <img src={displayImage} />
                </div>
                <div className="message-content">
                    <span className="user-name">test</span>
                    <span>8:30pm</span>
                    <p className="message">Finished my course and certificate verification process a week before, but still now not received my certificate. </p>
                </div>

            </div>

        });
    }
    render() {
        const messages = [1, 2, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1]
        return (
            <div>
                {this.generateMessageContent(messages)}
            </div>

        );
    }
}

MessageContentComponent.propTypes = {
    // videoList: PropTypes.array,
    // getVideoByPageNumber: PropTypes.func
}