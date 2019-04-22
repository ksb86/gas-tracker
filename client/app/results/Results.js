import React from 'react';
import { connect } from 'react-redux'

import './Results.less';

class Results extends React.Component {
    render() {
        return (
            <div>
                <div className={`entry-result ${(this.props.entrySuccess) ? 'success' : ''}`}>
                    {this.props.entrySuccess &&
                        <div className="entry-success-message">Entry was added!</div>}
                    {/* <div className="loader-container">
                        <img src="loader.gif" />
                    </div> */}
                    <div className="vehicle-result">{this.props.vehicle.toUpperCase()}</div>
                    <div className="mpg-result">{this.props.mpg}</div>
                    <div className="ppm-result">{this.props.ppm}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        entrySuccess: state.entrySuccess,
        vehicle: state.vehicle,
        mpg: state.mpg,
        ppm: state.ppm
    };
};

export default connect(mapStateToProps, null)(Results);
