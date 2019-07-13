import React from 'react';
import PropTypes from 'prop-types'
import './message-area-component.scss';
import DetailsBarComponent from './details-bar/details-bar-componet';
import MessageContentComponent from './message-content/message-content-component';

export default class MessageAreaComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoList: [],
            isLastSetOfData: false,
            lastPageRequested: 1
        }
    }
    componentDidMount() {
        // document.addEventListener('scroll', this.trackScrolling);
    }
    componentWillReceiveProps(newProps) {
        // this.setState();
    }


    render() {
        const messages = ['test', 'test2']
        return (
            <div className="message-area">
                <DetailsBarComponent />
                <div className="message-display-area">
                    <MessageContentComponent />
                </div>
                <div className="message-entry-area">
                    <input placeholder="Enter Messge here" />
                </div>
            </div>
        );
    }
}

MessageAreaComponent.propTypes = {
    // videoList: PropTypes.array,
    // getVideoByPageNumber: PropTypes.func,
    // isLastSetOfData: PropTypes.any,
    // lastPageRequested: PropTypes.any
}