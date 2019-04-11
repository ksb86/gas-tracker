import React from 'react';

import './Results.less';

class Results extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
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
