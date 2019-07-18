import React from 'react';
import PropTypes from 'prop-types'
import './details-bar-componet.scss';
import CommonPopUpComponent from '../../common-popup/common-popup-component';

export default class DetailsBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channelDetails: {},
            userSuggestions: []
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(newProps) {
        if (newProps.channelDetails) {
            this.setState({ channelDetails: newProps.channelDetails, addUser: newProps.addUser })
            console.log(newProps.addUser);
        }
        if(newProps.userSuggestions && newProps.userSuggestions !== this.userSuggestions) {
            this.setState({userSuggestions: newProps.userSuggestions});
        }
    }


    render() {
        const channelDetails = this.state.channelDetails;
        return (
            <div className="details-bar">
                <div className="message-area-details">
                    <div className="message-area-title">
                        {channelDetails && channelDetails.type === 'Groups' ? ('#' + channelDetails.group_name) : channelDetails.user_name}
                    </div>
                    {
                        channelDetails && channelDetails.type === 'Groups' ? <div className="message-area-content">
                            <span className="content"><i className="far fa-star"></i></span>
                            <span className="content"><i className="far fa-user"></i> {channelDetails.members.length}</span>
                        </div> : ''
                    }
                </div>
                <div className="search-area-details">
                    <div className="search-container">
                        <i className="fas fa-search"></i>

                        <input type="text" placeholder="Search..." />
                    </div>
                    <CommonPopUpComponent addUser={this.state.addUser} getUser={this.props.getUser} userSuggestions={this.state.userSuggestions} groupName={channelDetails.group_name}/>
                </div>
            </div>
        );
    }
}

DetailsBarComponent.propTypes = {
    channelDetails: PropTypes.any,
    getUser: PropTypes.func,
    userSuggestions: PropTypes.array,
    addUser: PropTypes.func
}