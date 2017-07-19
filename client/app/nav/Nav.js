import React from 'react';

import './Nav.less';

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }
    onNavClick = (e) => {
        this.props.updateNavState(e.target.dataset.page);
    };
    isActive = (page) => {
        if (this.props.state.view === page) {
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

export default Nav;
