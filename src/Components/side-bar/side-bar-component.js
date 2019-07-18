import React from 'react';
import PropTypes from 'prop-types'
import './side-bar-component.scss';
import CommonPopUpComponent from '../common-popup/common-popup-component';

export default class SideBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            directMessage: [],
            threads: [],
            currentSelected: null,
            userSuggestions: [],
            unreadMessage: {}
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(newProps) {
        if (newProps.groups !== this.props.groups || newProps.directMessage !== this.props.directMessage || this.props.threads !== newProps.threads) {
            this.setState({ groups: newProps.groups, directMessage: newProps.directMessage, threads: newProps.threads });
        }
        if (newProps.userSuggestions && newProps.userSuggestions !== this.props.userSuggestions) {
            this.setState({ userSuggestions: newProps.userSuggestions });
        }
        if (newProps.unreadMessage !== this.props.unreadMessage) {
            console.log(newProps.unreadMessage);
            this.setState({ unreadMessage: newProps.unreadMessage });
        }
    }
    setCurrentSelected = (item, itemHeader) => {
        this.setState({ currentSelected: itemHeader === 'Groups' ? 'G' + item.group_id : 'I' + item.user_id });
        this.props.getConversationHistory(itemHeader === 'Groups' ? item.group_id : item.user_id, itemHeader)
    }
    createGroup = (groupDetails) => {
        this.props.createGroup(groupDetails);
    }
    sendInvite = (userDetails) => {
        let checkIfUserExistInScreen = false;
        if (this.props.directMessage) {
            this.props.directMessage.forEach(im => {
                if (im.user_id === userDetails.toUser) {
                    checkIfUserExistInScreen = true;
                }
            });
        }
        if (checkIfUserExistInScreen) {
            this.setCurrentSelected({ user_id: userDetails.toUser }, 'Im');
        } else {
            this.props.sendInvite(userDetails);
        }
    }

    getUnreadMessage = (item, itemType) => {
        if (itemType === 'Groups' && this.state.unreadMessage['Groups' + item.group_id]) {
            return <span className="unread-message">{this.state.unreadMessage['Groups' + item.group_id]}</span>
        } else if (itemType !== 'Groups' && this.state.unreadMessage['Im' + item.user_id]) {
            return <span className="unread-message">{this.state.unreadMessage['Im' + item.user_id]}</span>
        }
    }
    generateListItems = (itemList, itemHeader) => {
        const checkSelected = function (currentSelected, item) {
            const itemId = itemHeader === 'Groups' ? 'G' + item.group_id : 'I' + item.user_id;
            const returnClass = itemId === currentSelected ? 'list-item-content selected' : 'list-item-content';
            return returnClass;
        }
        return <div className="list-item-holder">
            <div className="list-item-header">{itemHeader}
                <span className="add-icon"><CommonPopUpComponent popupType={itemHeader} createGroup={this.createGroup} sendInvite={this.sendInvite} getUser={this.props.getUser} userSuggestions={this.state.userSuggestions} /></span>
            </div>
            {
                itemList ? itemList.map(item => {
                    return <div className={checkSelected(this.state.currentSelected, item)} onClick={() => this.setCurrentSelected(item, itemHeader)}>{itemHeader === 'Groups' ? '#' : <i class="fas fa-circle"></i>} {itemHeader === 'Groups' ? item.group_name : item.user_name} {this.getUnreadMessage(item, itemHeader)}</div>
                }) : ''
            }
        </div>
    }
    render() {
        return (

            <div className="side-bar-component" >
                <div className="current-user-name">
                    <span>Chat App</span>
                </div>
                {this.generateListItems(this.state.groups, 'Groups')}
                {this.generateListItems(this.state.directMessage, 'Direct Message')}
            </div>
        );
    }
}

SideBarComponent.propTypes = {
    userDetails: PropTypes.any,
    getConversationHistory: PropTypes.func,
    createGroup: PropTypes.func,
    groups: PropTypes.array,
    directMessage: PropTypes.array,
    threads: PropTypes.array,
    sendInvite: PropTypes.func,
    getUser: PropTypes.func,
    userSuggestions: PropTypes.array,
    unreadMessage: PropTypes.any
}