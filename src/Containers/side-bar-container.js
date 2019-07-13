import React from 'react';
import { connect } from 'react-redux';
import SideBarComponent from '../Components/side-bar/side-bar-component';
import PropTypes from 'prop-types'

class SideBarContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(newProps) {
      
    }
    render() {
        return (
            <SideBarComponent/>
        );
    }
}
SideBarContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        // searchField: state.searchField,
    }
}

export default connect(mapStateToProps)(SideBarContainer);
