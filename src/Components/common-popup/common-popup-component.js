import React from 'react';
import PropTypes from 'prop-types'
import './common-popup-component.scss';
import Popup from "reactjs-popup";

export default class CommonPopUpComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popupType: this.props.popupType,
            newgroupName: '',
            members: [],
            chipValue: [],
            userSuggestions: [],
            userSearchInfocus: false,
            groupName: null
        }
        this.userInput = '';
        this.close = '';
    }
    componentDidMount() {

    }

    componentWillReceiveProps(newProps) {
        if (newProps.popupType !== this.props.popupType) {
            this.setState({ popupType: newProps.popupType });
        }
        if(newProps.groupName && newProps.groupName !== this.props.groupName) {
            this.setState({groupName: newProps.groupName})
        }
        if (newProps.userSuggestions !== this.props.userSuggestions) {
            this.setState({ userSuggestions: newProps.userSuggestions });
        }
        // if(newProps.addUser && newProps.addUser !== this.props.addUser){
        //     this.setState({addUser: newProps.addUser});
        // }
    }

    updateInput = (events, type) => {
        if (type === 'newgroupName') {
            this.setState({ newgroupName: events.target.value })
        }
        else {
            if (events.target.value !== '') {
                this.props.getUser(events.target.value);
            } else {
                this.setState({ userSuggestions: [] })
            }
        }
    }

    createGroup = (close) => {
        this.props.createGroup({ groupName: this.state.newgroupName, members: this.state.members });
        this.setState({chipValue: [], userSuggestions: []})
        close();
    }
    sendInvite = (userId) => {
        this.props.sendInvite({ toUser: userId ? userId : this.state.members });
        this.setState({chipValue: [], userSuggestions: []})
        this.close();
    }

    pushUser = (user) => {
        if (this.state.popupType === 'Groups' || this.state.groupName) {
            this.setState({ members: this.state.members.concat(Number(user.user_id)), chipValue: this.state.chipValue.concat(user), userSuggestions: [] });
            this.userInput.value = '';
        } else {
            this.sendInvite(user.user_id);
        }
    }

    generateAutoSuggest = () => {
        if (this.state.userSuggestions && this.state.userSuggestions.length > 0) {
            return <div className="auto-suggestions">
                {
                    this.state.userSuggestions.map(user => {
                        return <div className="suggestion" onClick={() => this.pushUser(user)}>
                            <span >{user.user_name}</span>
                        </div>
                    })
                }
            </div>
        }

    }
    inviteMembers = (close) => {
        this.props.addUser(this.state.members, this.state.groupName);
        this.clearVal(close);
    }
    clearVal = (close) => {
        this.setState({chipValue: [], userSuggestions: []})
        close();
    }
    generateGroupElements = (close) => {
        return <div className="custom-popup-content">
            <h3>Create Group</h3>
            <p>Groups are where your members communicate. They're best when organized around a topic - #leads for example</p>
            <div className="input-holder">
                <label>Name</label>
                <input onChange={(events) => this.updateInput(events, 'newgroupName')} />
            </div>
            <div className="input-holder">
                <label>Send Invites To</label>
                <div className="chips-input" onClick={() => { this.userInput.focus() }}>
                    {this.state.chipValue.map(chip => <div className="chip">{chip.user_name}<span className="chip-close">X</span></div>)}
                    <input type="text" ref={(node) => this.userInput = node} onChange={(events) => this.updateInput(events, 'members')} />
                </div>

                {this.generateAutoSuggest()}
            </div>
            <button className="btn create" onClick={() => this.createGroup(close)}>Create Channel</button>
            <button className="btn" onClick={() => this.clearVal(close)}>Cancel</button>
        </div >
    }
    generateAddMembersElements = (close) => {
        this.close = close;
        return <div className="custom-popup-content">
            <h3>Add Member</h3>
            <div className="input-holder">
                <label>Send Invites To</label>
                <input onChange={(events) => this.updateInput(events, 'member')} />
                {this.generateAutoSuggest()}
            </div>
            <button className="btn create" onClick={() => this.sendInvite(null)}>Create Channel</button>
            <button className="btn" onClick={close}>Cancel</button>
        </div>
    }
    generateGroupInviteElement = (close) => {
        return <div className="custom-popup-content">
            <h3>Add Member</h3>
            <div className="input-holder">
                <label>Send Invites To</label>
                <div className="chips-input" onClick={() => { this.userInput.focus() }}>
                    {this.state.chipValue.map(chip => <div className="chip">{chip.user_name}<span className="chip-close">X</span></div>)}
                    <input type="text" ref={(node) => this.userInput = node} onChange={(events) => this.updateInput(events, 'members')} />
                </div>

                {this.generateAutoSuggest()}
            </div>
            <button className="btn create" onClick={() => this.inviteMembers(close)}>Add Member</button>
            <button className="btn" onClick={() =>this.clearVal(close)}>Cancel</button>
        </div >
    }
    render() {
        return (

            <div className="common-popup" >
                {this.state.groupName ? <Popup trigger={<i className="fas fa-cog"></i>} modal backdrop="static">
                    {close => (this.generateGroupInviteElement(close))}
                </Popup> : <Popup trigger={<span className="add-icon">+</span>} modal backdrop="static">
                        {close => (this.state.popupType === 'Groups' ? this.generateGroupElements(close) : this.generateAddMembersElements(close))}
                    </Popup>
                }
            </div>
        );
    }
}

CommonPopUpComponent.propTypes = {
    popupType: PropTypes.any,
    createGroup: PropTypes.func,
    sendInvite: PropTypes.func,
    getUser: PropTypes.func,
    userSuggestions: PropTypes.array,
    groupName: PropTypes.any,
    addUser: PropTypes.func

}