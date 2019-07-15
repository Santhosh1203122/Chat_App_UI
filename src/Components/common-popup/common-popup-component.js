import React from 'react';
import PropTypes from 'prop-types'
import './common-popup-component.scss';
import Popup from "reactjs-popup";

export default class CommonPopUpComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popupType: this.props.popupType,
            groupName: '',
            members: []
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(newProps) {
        if (newProps !== this.props) {
            this.setState({ popupType: newProps.popupType });
        }
    }
    updateInput = (events, type) => {
        if (type === 'groupName') {
            this.setState({ groupName: events.target.value })
        } else {
            this.setState({members: this.state.members.concat(Number(events.target.value))})
        }
    }
    createGroup = (close) => {
        this.props.createGroup({groupName: this.state.groupName, members: this.state.members});
        close();
    }
    render() {
        return (

            <div className="common-popup" >
                <Popup trigger={<span className="add-icon">+</span>} modal backdrop="static">
                    {close => (
                        <div className="custom-popup-content">
                            <h3>
                                {
                                    this.state.popupType === 'Groups' ? 'Create Group' : 'Search Member'
                                }
                            </h3>
                            <p>Groups are where your members communicate. They're best when organized around a topic - #leads for example</p>
                            <div className="input-holder">
                                <label>Name</label>
                                <input onChange={(events) => this.updateInput(events, 'groupName')} />
                            </div>
                            <div className="input-holder">
                                <label>Send Invites To</label>
                                <input onChange={(events) => this.updateInput(events, 'members')} />
                            </div>
                            <button className="btn create" onClick={() => this.createGroup(close)}>Create Channel</button>
                            <button className="btn" onClick={close}>Cancel</button>

                        </div>)

                    }
                </Popup>
            </div>
        );
    }
}

CommonPopUpComponent.propTypes = {
    popupType: PropTypes.any,
    createGroup: PropTypes.func
}