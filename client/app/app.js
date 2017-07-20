import React from 'react';
import AddPage from './pages/AddPage'
import ListPage from './pages/ListPage';
import Nav from './nav/Nav';

import './app.less';


const getTodayDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // month index is zero based\

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return `${yyyy}-${mm}-${dd}`;
};

const initialState = {
    ppg: '',
    total: '',
    miles: '',
    odometer: '',
    date: getTodayDate(),
    vehicle: 'odyssey',
    mpg: '--',
    ppm: '--',
    view: 'add',
    formDisabled: false,
    submitDisabled: true,
};
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    updateStateFromResponse(response) {
        let prevState = this.state;
        this.setState((prevState) => ({
            message: response.data.message
        }));
    };

    updateNavState = (page) => {
        var newState = { ...this.state };
        newState.view = page;
        this.setState(newState);
    };

    isFormFull = (newState) => {
         if (newState.ppg.length > 0 && newState.total.length > 0 && newState.miles.length > 0 && newState.odometer.length > 0 && newState.date.length > 0) {
             return true;
         }
         return false;
    };

    onInputChange = (e) => {
        // get value
        var userValue = e.target.value;
        // strip all but numbers and decimal.
        var cleanedValue = userValue.replace(/[^0-9.]/g, '');
        // copy state
        var newState = { ... this.state };
        // add value to corresponding input in state
        newState[e.target.name] = cleanedValue;

        // calculate miles per gallon
        var mpg = parseInt(newState.miles) / (parseFloat(newState.total) / parseFloat(newState.ppg));
        mpg = mpg.toFixed(1);
        newState.mpg = (mpg === 'NaN' ? '--' : `${mpg} mpg`);

        // calculate price per mile
        var ppm = parseFloat(newState.total) / parseFloat(newState.miles);
        ppm = ppm.toFixed(2);
        newState.ppm = (ppm === 'NaN' ? '--' : `$${ppm} per mi`);

        // disable form if any inputs are empty
        newState.submitDisabled = !this.isFormFull(newState);

        // update state
        this.setState(newState);
    };
    onDateChange = (e) => {
        // copy state
        var newState = { ... this.state };

        // add value to corresponding input in state
        newState[e.target.name] = e.target.value;

        // disable form if any inputs are empty
        newState.submitDisabled = !this.isFormFull(newState);

        // update state
        this.setState(newState);
    };
    onVehicleChange = (e) => {
        // copy state
        var newState = { ... this.state };

        // add value to corresponding input in state
        newState[e.target.name] = e.target.value;

        // update state
        this.setState(newState);
    };
    resetForm = (e) => {
        e.preventDefault();
        // set state to initial state
        this.setState(initialState);
    };
    onFormSubmit = (e) => {
        e.preventDefault();
        // todo: save the data here
        alert(`send to firebase! ${JSON.stringify(this.state)}`);
    };
    deleteEntry = (id) => {
        // todo: delete entry here
        console.log(`delete this: ${id}`);
    };
    render() {
        return (
            <div>
                {this.state.view === 'add' &&
                    <AddPage
                        state={this.state}
                        onInputChange={this.onInputChange}
                        onDateChange={this.onDateChange}
                        onVehicleChange={this.onVehicleChange}
                        onFormSubmit={this.onFormSubmit}
                        resetForm={this.resetForm}
                    />}
                {this.state.view === 'list' &&
                    <ListPage state={this.state}
                        deleteEntry={this.deleteEntry}
                    />}
                <Nav state={this.state} updateNavState={this.updateNavState}/>
            </div>
        )
    }
}

export default App;
