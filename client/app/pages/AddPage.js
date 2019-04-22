import React from 'react';
import Form from '../form/Form';
import Results from '../results/Results';

import './AddPage.less';

class AddPage extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="add-page">
                <Form />
                <Results />
            </div>
        )
    }
}

export default AddPage;
