export const UPDATE_ENTRIES = 'UPDATE_ENTRIES';
export const UPDATE_VIEW = 'UPDATE_VIEW';
export const UPDATE_FORM = 'UPDATE_FORM';

export const updateEntriesFromFireBase = payload => {
    const entries = Object.values(payload);

    return {
        type: UPDATE_ENTRIES,
        payload: entries
    };
};

export const updateView = payload => {
    return {
        type: UPDATE_VIEW,
        payload
    };
};

export const updateForm = payload => {
    return {
        type: UPDATE_FORM,
        payload
    };
};