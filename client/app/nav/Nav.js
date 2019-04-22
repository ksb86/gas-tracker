import React from 'react';
import { connect } from 'react-redux'

import {
    updateView
} from '../../actions';

import './Nav.less';

class Nav extends React.Component {
    onNavClick = e => {
        this.props.updateView(e.target.dataset.page);
    };
    isActive = page => {
        if (this.props.view === page) {
            return 'active';
        }
        return null;
    };
    render() {
        return (
            <div className='bottom-nav'>
                <div className={`nav-item ${this.isActive('add')}`} onClick={this.onNavClick} data-page='add'>
                    +
                </div>
                <div className={`nav-item ${this.isActive('list')}`} onClick={this.onNavClick}  data-page='list'>
                    ...
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        view: 'add'
    };
};

const mapDispatchToProps = {
    updateView
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
