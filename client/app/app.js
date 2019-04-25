import React from 'react';
import { connect } from 'react-redux'
import AddPage from './pages/AddPage'
import ListPage from './pages/ListPage';
import Nav from './nav/Nav';
import Firebase from 'firebase';
import {
    fbDataLocation
} from '../constants';

import {
    updateEntriesFromFireBase
} from '../actions';

import './app.less';

class App extends React.Component {
    componentDidMount () {
        if (!window.fbConfig) {
            console.error('no firebase config data found...');
        }
        Firebase.initializeApp(window.fbConfig);
        const ref = Firebase.database().ref(fbDataLocation).orderByChild("timestamp");
        ref.on('value', snapshot => {
            this.props.updateEntriesFromFireBase(snapshot.val())
        });
    }

    render() {
        return (
            <div>
                {this.props.view === 'add' &&
                    <AddPage />
                }
                {this.props.view === 'list' &&
                    <ListPage />
                }
                <Nav />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        view: state.view
    };
};

const mapDispatchToProps = {
    updateEntriesFromFireBase
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
