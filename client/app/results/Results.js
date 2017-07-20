import React from 'react';

import './Results.less';

class Results extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="entry-result">
                    {/* <div className="loader-container">
                        <img src="loader.gif" />
                    </div> */}
                    <div className="vehicle-result">{this.props.state.vehicle.toUpperCase()}</div>
                    <div className="mpg-result">{this.props.state.mpg}</div>
                    <div className="ppm-result">{this.props.state.ppm}</div>
                </div>
            </div>
        )
    }
}

export default Results;
