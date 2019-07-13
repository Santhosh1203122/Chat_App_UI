import React from 'react';
import PropTypes from 'prop-types'
import './side-bar-component.scss';

export default class SideBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(newProps) {
        // this.setState();
    }

    generateListItems = (itemList, itemHeader) => {
        return <div className="list-item-holder">
            <div className="list-item-header">{itemHeader}<span className="add-icon">+</span></div>
            {
                itemList.map(item => {
                    return <div className="list-item-content"># {item.displayName} </div>
                })
            }
            {
                itemHeader === 'Groups' ? <div className="list-item-content selected"># selected </div> : ''
            }
        </div>
    }
    render() {
        const groupsList = [{ displayName: 'general' }, { displayName: 'tech-chat' }];
        return (
            <div className="side-bar-component" >
                <div className="current-user-name">
                    <span>Chat App</span>
                </div>
                {this.generateListItems(groupsList, 'Groups')}
                {this.generateListItems(groupsList, 'Direct Message')}
            </div>
        );
    }
}

SideBarComponent.propTypes = {

}