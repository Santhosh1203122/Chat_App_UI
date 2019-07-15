import React from 'react';
import PropTypes from 'prop-types'
import './message-area-component.scss';
import DetailsBarComponent from './details-bar/details-bar-componet';
import MessageContentComponent from './message-content/message-content-component';

export default class MessageAreaComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conversations: []
        }
    }
    componentDidMount() {
        // document.addEventListener('scroll', this.trackScrolling);
    }
    componentWillReceiveProps(newProps) {
        if(newProps.conversations) {
            this.setState({conversations: newProps.conversations});
        }
    }
    sendMessage = (event) => {
        if(event.key === 'Enter') {
            this.props.sendMessage(event.target.value);
            event.target.value = ''
        }
    }


    render() {
        return (
            <div className="message-area">
                <DetailsBarComponent />
                <div className="message-display-area">
                    <MessageContentComponent conversations={this.state.conversations}/>
                </div>
                <div className="message-entry-area">
                    <input placeholder="Enter Messge here"  onKeyDown={this.sendMessage}/>
                </div>
            </div>
        );
    }
}

MessageAreaComponent.propTypes = {
    conversations: PropTypes.array,
    sendMessage: PropTypes.func
    // videoList: PropTypes.array,
    // getVideoByPageNumber: PropTypes.func,
    // isLastSetOfData: PropTypes.any,
    // lastPageRequested: PropTypes.any
}