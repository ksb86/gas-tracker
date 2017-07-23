import React from 'react';
import Entry from '../entry/Entry';

import './ListPage.less';

class ListPage extends React.Component {
    constructor(props) {
        super(props);
    }
    buildEntries = () => {
        var orderedArray = this.props.state.entries;
        orderedArray.sort(function(a, b) {
            if (a.date < b.date) {
                return 1;
            }
            if (a.date > b.date) {
                return -1;
            }
        });
        return orderedArray.map((entryData) => {
            return (
                <Entry
                    key={entryData['.key']}
                    entryData={entryData}
                    deleteEntry={this.props.deleteEntry}
                />
            );
        });
    }
    render() {
        return (
            <div className="list-page">
                <h3>Fillups</h3>
                {this.buildEntries()}
            </div>
        );
    }
}

export default ListPage;
