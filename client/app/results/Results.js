import React from 'react';

import './Results.less';

class Results extends React.Component {

    constructor(props) {
        super(props);
    }
    onSignIn = googleUser => {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
      
    render() {
        return (
            <div>
                <div className="g-signin2" data-onsuccess={this.onSignIn}></div>
                <div className={`entry-result ${(this.props.state.form.entrySuccess) ? 'success' : ''}`}>
                    {this.props.state.form.entrySuccess &&
                        <div className="entry-success-message">Entry was added!</div>}
                    {/* <div className="loader-container">
                        <img src="loader.gif" />
                    </div> */}
                    <div className="vehicle-result">{this.props.state.form.vehicle.toUpperCase()}</div>
                    <div className="mpg-result">{this.props.state.form.mpg}</div>
                    <div className="ppm-result">{this.props.state.form.ppm}</div>
                </div>
            </div>
        )
    }
}

export default Results;
