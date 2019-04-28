import React from 'react';
import { connect } from 'react-redux';
import Firebase from 'firebase';

import { updateForm } from '../../actions';

import FormInput from '../formInput/FormInput';
import './Form.less';

class Form extends React.Component {
    isFormFull = () => {
        if (this.props.ppg.length > 0 &&
            this.props.total.length > 0 &&
            this.props.miles.length > 0 &&
            this.props.odometer.length > 0) {
            return true;
        }
        return false;
    };


    onInputChange = e => {
        // get value
        var userValue = e.target.value;
        // strip all but numbers and decimal.
        var cleanedValue = userValue.replace(/[^0-9.]/g, '');
        // add value to corresponding input in state
        const formUpdates = {};
        formUpdates[e.target.name] = cleanedValue;

        // calculate miles per gallon
        let mpg = parseInt(this.props.miles) / (parseFloat(this.props.total) / parseFloat(this.props.ppg));
        mpg = mpg.toFixed(1);
        formUpdates.mpg = (mpg === 'NaN' ? '--' : `${mpg} mpg`);

        // calculate price per mile
        let ppm = parseFloat(this.props.total) / parseFloat(this.props.miles);
        ppm = ppm.toFixed(2);
        formUpdates.ppm = (ppm === 'NaN' ? '--' : `$${ppm} per mi`);

        // disable form if any inputs are empty
        formUpdates.submitDisabled = !this.isFormFull();

        // update state
        this.props.updateForm(formUpdates);
    };

    onVehicleChange = e => {
        // copy state
        var formUpdates = {};

        // add value to corresponding input in state
        formUpdates[e.target.name] = e.target.value;

        // update state
        this.props.updateForm(formUpdates);
    };
    onFormSubmit = e => {
        e.preventDefault();

        // make entry object from the state
        const entry = {
            ppg: this.props.ppg,
            total: this.props.total,
            miles: this.props.miles,
            odometer: this.props.odometer,
            timestamp: Date.now(),
            vehicle: this.props.vehicle
        };

        // add it to firebase
        const newPostKey = Firebase.database().ref(process.env.FB_PATH).push().key;
        const updates = {};
        entry.key = newPostKey;
        updates[`/${process.env.FB_PATH}/${newPostKey}`] = entry;
        Firebase.database().ref().update(updates);

        // update state for successful entry addition.  should be in firebase success callback..
        this.props.updateForm({
            entrySuccess: true
        });
    };

    resetForm = e => {
        e.preventDefault();
        this.props.updateForm({
            ppg: '',
            total: '',
            miles: '',
            odometer: '',
            vehicle: 'odyssey',
            entrySuccess: false,
            submitDisabled: true,
            mpg: '--',
            ppm: '--'
        });
    };

    render() {
        return (
            <form className="form" noValidate="noValidate" onSubmit={this.onFormSubmit}>
                <div className="row">
                    <FormInput
                        name={'ppg'}
                        label={'$/gal'}
                        value={this.props.ppg}
                        onChange={this.onInputChange}
                        type={'number'}
                        disabled={this.props.entrySuccess}
                    />
                    <FormInput
                        name={'total'}
                        label={'Total'}
                        value={this.props.total}
                        onChange={this.onInputChange}
                        type={'number'}
                        disabled={this.props.entrySuccess}
                    />
                </div>
                <div className="row">
                    <FormInput
                        name={'miles'}
                        label={'Miles'}
                        value={this.props.miles}
                        onChange={this.onInputChange}
                        type={'number'}
                        disabled={this.props.entrySuccess}
                    />
                    <FormInput
                        name={'odometer'}
                        label={'Odometer'}
                        value={this.props.odometer}
                        onChange={this.onInputChange}
                        type={'number'}
                        disabled={this.props.entrySuccess}
                    />
                </div>
                <div className="row">
                    <div className="cell">
                        <label htmlFor="vehicle" className="hvr-wobble-horizontal">
                            <span className="label-text">Vehicle</span>
                            <select disabled={this.props.entrySuccess} onChange={this.onVehicleChange} value={this.props.vehicle} name="vehicle" id="vehicle">
                                <option value="odyssey">Odyssey</option>
                                <option value="crv">CRV</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="row small-row">
                    <button type="button" className="form-reset-btn" onClick={this.resetForm}>Clear</button>
                </div>
                <div className="row">
                    <button type="submit" disabled={this.props.submitDisabled || this.props.entrySuccess}>Submit</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        ppg: state.ppg,
        total: state.total,
        miles: state.miles,
        odometer: state.odometer,
        vehicle: state.vehicle,
        entrySuccess: state.entrySuccess,
        submitDisabled: state.submitDisabled,
        mpg: state.mpg,
        ppm: state.ppm
    };
};

const mapDispatchToProps = {
    updateForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
