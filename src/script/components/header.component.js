// External dependencies
import React from 'react';

export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div id="main-navbar" className="main-navbar">

            {this.props.enabled && <div id="main-navbar-items" className="navbar-items">
                <div className="navbar-item">
                    <span>Events</span>
                </div>
            </div>}

            <div className="ft-logo md">
                <div id="logout-button"></div>
                <div className="tooltip-wrapper under">
                    <div className="arrow-up"></div>
                    Log Out
                </div>
            </div>

            <div className="navbar-footer"></div>

        </div>);
    }
};

