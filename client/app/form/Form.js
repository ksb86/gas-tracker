import React from 'react';

import './Form.less';

class Form extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <form className="form" noValidate="noValidate">
                <div className="row">
                    <div className="cell">
                        <label htmlFor="ppg" className="hvr-wobble-horizontal">
                            <span className="label-text">$/gal</span>
                            <input onChange={this.props.onInputChange} name="ppg" value={this.props.state.ppg} id="ppg" type="text" pattern="[0-9]*" data-decimal="2"/>
                        </label>
                    </div>
                    <div className="cell">
                        <label htmlFor="total" className="hvr-wobble-horizontal">
                            <span className="label-text">Total</span>
                            <input onChange={this.props.onInputChange} name="total" value={this.props.state.total} id="total" type="text" pattern="[0-9]*" data-decimal="2"/>
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="cell">
                        <label htmlFor="miles" className="hvr-wobble-horizontal">
                            <span className="label-text">Miles</span>
                            <input onChange={this.props.onInputChange} name="miles" value={this.props.state.miles} id="miles" type="text" pattern="[0-9]*" data-decimal="0"/>
                        </label>
                    </div>
                    <div className="cell">
                        <label htmlFor="odometer" className="hvr-wobble-horizontal">
                            <span className="label-text">Odometer</span>
                            <input onChange={this.props.onInputChange} name="odometer" value={this.props.state.odometer} id="odometer" type="text" pattern="[0-9]*" data-decimal="0"/>
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="cell">
                        <label htmlFor="date" className="hvr-wobble-horizontal">
                            <span className="label-text">Date</span>
                            <input onChange={this.props.onDateChange} value={this.props.state.date} name="date" id="date" type="date"/>
                        </label>
                    </div>
                    <div className="cell">
                        <label htmlFor="vehicle" className="hvr-wobble-horizontal">
                            <span className="label-text">Vehicle</span>
                            <select onChange={this.props.onVehicleChange} value={this.props.state.vehicle} name="vehicle" id="vehicle">
                                <option value="odyssey">Odyssey</option>
                                <option value="crv">CRV</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="row small-row">
                    <button className="form-reset-btn" onClick={this.props.resetForm}>Clear</button>
                </div>
                <div className="row">
                    <button type="submit" onClick={this.props.onFormSubmit} disabled={this.props.state.submitDisabled}>Submit</button>
                </div>
            </form>
        )
    }
}

export default Form;
