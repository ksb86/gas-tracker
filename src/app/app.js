import React from 'react';
// import Form from '../form/form';

import './app.less';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Hello Gas Tracker'
        };
    }
    updateStateFromResponse(response) {
        let prevState = this.state;
        this.setState((prevState) => ({
            message: response.data.message
        }));
    }
    render() {
        // use <Form data={this.state}/> here
        return (
            <div>
                <h1> {this.state.message} </h1>
            </div>
        )
    }
}

export default App;
