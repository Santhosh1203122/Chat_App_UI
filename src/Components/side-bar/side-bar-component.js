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
            currentSelected: null
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(newProps) {
        if (newProps.userDetails) {
            console.log(newProps);
            this.setState({ groups: newProps.groups, directMessage: newProps.directMessage, threads: newProps.threads });
        }
    }
    setCurrentSelected = (item, itemHeader) => {
        this.setState({ currentSelected: itemHeader === 'Groups' ? 'G' + item.group_id : 'I' + item.user_id });
        this.props.getConversationHistory(itemHeader === 'Groups' ? item.group_id : item.user_id, itemHeader)
    }
    createGroup = (groupDetails) => {
        this.props.createGroup(groupDetails);
    }
    generateListItems = (itemList, itemHeader) => {
        const checkSelected = function (currentSelected, item) {
            const itemId = itemHeader === 'Groups' ? 'G' + item.group_id : 'I' + item.user_id;
            const returnClass = itemId === currentSelected ? 'list-item-content selected' : 'list-item-content';
            return returnClass;
        }
        return <div className="list-item-holder">
            <div className="list-item-header">{itemHeader}
                <span className="add-icon"><CommonPopUpComponent popupType={itemHeader} createGroup={this.createGroup} /></span>
            </div>
            {
                itemList ? itemList.map(item => {
                    return <div className={checkSelected(this.state.currentSelected, item)} onClick={() => this.setCurrentSelected(item, itemHeader)}>{itemHeader === 'Groups' ? '#' : <i class="fas fa-circle"></i>} {itemHeader === 'Groups' ? item.group_name : item.user_name} </div>
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
    threads: PropTypes.array
}