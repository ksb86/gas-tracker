import React from 'react';

import FormInput from '../formInput/FormInput';
import './Form.less';

class Form extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <form className="form" noValidate="noValidate">
                <div className="row">
                    <FormInput
                        name={'ppg'}
                        label={'$/gal'}
                        value={this.props.state.ppg}
                        onChange={this.props.onInputChange}
                        type={'number'}
                    />
                    <FormInput
                        name={'total'}
                        label={'Total'}
                        value={this.props.state.total}
                        onChange={this.props.onInputChange}
                        type={'number'}
                    />
                </div>
                <div className="row">
                    <FormInput
                        name={'miles'}
                        label={'Miles'}
                        value={this.props.state.miles}
                        onChange={this.props.onInputChange}
                        type={'number'}
                    />
                    <FormInput
                        name={'odometer'}
                        label={'Odometer'}
                        value={this.props.state.odometer}
                        onChange={this.props.onInputChange}
                        type={'number'}
                    />
                </div>
                <div className="row">
                    <FormInput
                        name={'date'}
                        label={'Date'}
                        value={this.props.state.date}
                        onChange={this.props.onDateChange}
                        type={'date'}
                    />
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
