import React from 'react';
import { connect } from 'react-redux';
import MessageAreaComponent from '../Components/message-area/message-area-component';
import PropTypes from 'prop-types'

class MessageAreaContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(newProps) {
      
    }
    render() {
        return (
            <MessageAreaComponent/>
        );
    }
}
MessageAreaContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        // searchField: state.searchField,
    }
}

export default connect(mapStateToProps)(MessageAreaContainer);
