import React from 'react';
import Form from '../form/Form';
import Results from '../results/Results';

import './AddPage.less';

class AddPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Form
                    state={this.props.state}
                    onInputChange={this.props.onInputChange}
                    onDateChange={this.props.onDateChange}
                    onVehicleChange={this.props.onVehicleChange}
                    onFormSubmit={this.props.onFormSubmit}
                    resetForm={this.props.resetForm}
                />
                <Results
                    state={this.props.state}
                />
            </div>
        )
    }
}

export default AddPage;
