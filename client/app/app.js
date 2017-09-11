import React from 'react';
import AddPage from './pages/AddPage'
import ListPage from './pages/ListPage';
import Nav from './nav/Nav';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire'; // ES6
import reactMixin from 'react-mixin';

import './app.less';

const fbDataLocation = 'entries';

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

const initialFormState = {
    ppg: '',
    total: '',
    miles: '',
    odometer: '',
    date: getTodayDate(),
    vehicle: 'odyssey',
    entrySuccess: false,
    submitDisabled: true,
    mpg: '--',
    ppm: '--',
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {...initialFormState},
            view: 'add',
            entries: []
        };
    }
    componentWillMount () {
        Firebase.initializeApp(window.fbConfig);
        const ref = Firebase.database().ref(fbDataLocation).orderByChild("date");
        this.bindAsArray(ref, 'entries');
    }

    updateNavState = (page) => {
        var newState = { ...this.state };
        newState.view = page;
        this.setState(newState);
    };

    isFormFull = (newState) => {
         if (newState.form.ppg.length > 0 && newState.form.total.length > 0 && newState.form.miles.length > 0 && newState.form.odometer.length > 0 && newState.form.date.length > 0) {
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
        newState.form[e.target.name] = cleanedValue;

        // calculate miles per gallon
        var mpg = parseInt(newState.form.miles) / (parseFloat(newState.form.total) / parseFloat(newState.form.ppg));
        mpg = mpg.toFixed(1);
        newState.form.mpg = (mpg === 'NaN' ? '--' : `${mpg} mpg`);

        // calculate price per mile
        var ppm = parseFloat(newState.form.total) / parseFloat(newState.form.miles);
        ppm = ppm.toFixed(2);
        newState.form.ppm = (ppm === 'NaN' ? '--' : `$${ppm} per mi`);

        // disable form if any inputs are empty
        newState.form.submitDisabled = !this.isFormFull(newState);

        // update state
        this.setState(newState);
    };
    onDateChange = (e) => {
        // copy state
        var newState = { ... this.state };

        // add value to corresponding input in state
        newState.form[e.target.name] = e.target.value;

        // disable form if any inputs are empty
        newState.form.submitDisabled = !this.isFormFull(newState);

        // update state
        this.setState(newState);
    };
    onVehicleChange = (e) => {
        // copy state
        var newState = { ... this.state };

        // add value to corresponding input in state
        newState.form[e.target.name] = e.target.value;

        // update state
        this.setState(newState);
    };
    resetForm = (e) => {
        e.preventDefault();
        // set state to initial state
        var newState = { ... this.state };

        //using the 'const initialFormState' that's set at the top doesn't work for some reason..
        newState.form = {
            ppg: '',
            total: '',
            miles: '',
            odometer: '',
            date: getTodayDate(),
            vehicle: 'odyssey',
            entrySuccess: false,
            submitDisabled: true,
            mpg: '--',
            ppm: '--',
        };
        this.setState(newState);
    };
    onFormSubmit = (e) => {
        e.preventDefault();
        // make entry object from the state
        var entry = {
            ppg: this.state.form.ppg,
            total: this.state.form.total,
            miles: this.state.form.miles,
            odometer: this.state.form.odometer,
            date: this.state.form.date,
            vehicle: this.state.form.vehicle
        };

        // add it to firebase
        var newPostKey = Firebase.database().ref(fbDataLocation).push().key;
        var updates = {};
        updates[`/${fbDataLocation}/${newPostKey}`] = entry;
        Firebase.database().ref().update(updates);

        // update state for successful entry addition.  should be in firebase success callback..
        var newState = { ...this.state };
        newState.form.entrySuccess = true;
        this.setState(newState);
    };
    deleteEntry = (e) => {
        // delete entry by id from firebase
        return Firebase.database().ref(`${fbDataLocation}/${e.target.dataset.id}`).remove()
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

reactMixin(App.prototype, ReactFireMixin)

export default App;
