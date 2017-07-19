import React from 'react';
import AddPage from './pages/AddPage'
import ListPage from './pages/ListPage';
import Nav from './nav/Nav';

import './app.less';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pricePerGallon: '',
            total: '',
            miles: '',
            odometer: '',
            data: '',
            mpg: '',
            pricePerMile: '',
            vehicle: 'odyssey',
            view: 'add'
        };
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
    render() {
        return (
            <div>
                {this.state.view === 'add' && <AddPage />}
                {this.state.view === 'list' && <ListPage />}
                <Nav state={this.state} updateNavState={this.updateNavState}/>
            </div>
        )
    }
}

export default App;
