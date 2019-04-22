import {
    UPDATE_ENTRIES,
    UPDATE_VIEW,
    UPDATE_FORM
} from './actions';

import {
    getToday
} from './app/helpers';

export const initialState = {
    ppg: '',
    total: '',
    miles: '',
    odometer: '',
    date: getToday(),
    vehicle: 'odyssey',
    entrySuccess: false,
    submitDisabled: true,
    mpg: '--',
    ppm: '--',
    view: 'add',
    entries: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ENTRIES:
            console.log('action.payload: ', action.payload.length);
            return {
                ...state,
                entries: action.payload
            };

        case UPDATE_VIEW:
            return {
                ...state,
                view: action.payload
            };

        case UPDATE_FORM:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}