import React from 'react';
import PropTypes from 'prop-types'
import './details-bar-componet.scss';

export default class DetailsBarComponent extends React.Component {
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


    render() {
        return (
            <div className="details-bar">
                <div className="message-area-details">
                    <div className="message-area-title">
                        #general
                    </div>
                    <div className="message-area-content">
                        <span className="content"><i className="far fa-star"></i></span>
                        <span className="content"><i className="far fa-user"></i> 180</span>
                    </div>
                </div>
                <div className="search-area-details">
                    <div className="search-container">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search..." />
                    </div>
                    <i className="fas fa-cog"></i>
                </div>
            </div>
        );
    }
}

DetailsBarComponent.propTypes = {
    // videoList: PropTypes.array,
    // getVideoByPageNumber: PropTypes.func,
    // isLastSetOfData: PropTypes.any,
    // lastPageRequested: PropTypes.any
}