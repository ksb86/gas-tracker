import React from 'react';

import { formatDate } from '../helpers';
import './Entry.less';

class Entry extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            open: false,
            editing: false
        }
    }
    toggleOpen = (e) => {
        var newState = {...this.state};
        newState.open = !newState.open;
        this.setState(newState);
    }
    toggleEditing = (e) => {
        var newState = {...this.state};
        newState.editing = !newState.editing;
        this.setState(newState);
    }

    // calculates miles per gallon
    calcMpg = () => {
        return (this.props.entryData.miles / (this.props.entryData.total / this.props.entryData.ppg)).toFixed(1);
    }

    // calculates price per mile
    calcPpm = () => {
        return (this.props.entryData.total / this.props.entryData.miles).toFixed(2);
    }

    render () {
        return (
            <div className={`entry ${(this.state.open) ? 'open' : ''}`}>
                <div className="entry-header" onClick={this.toggleOpen}>
                    <span className="header-total">${this.props.entryData.total}</span>
                    <div>
                        <span className="header-vehicle-pill">{this.props.entryData.vehicle}</span>
                        <span className="header-date">{formatDate(this.props.entryData.timestamp)}</span>
                    </div>
                </div>
                <div className="entry-details">
                    <div className="details-left">
                        <div><span>Miles:</span> {this.props.entryData.miles} mi</div>
                        <div><span>Odo:</span> {this.props.entryData.odometer}</div>
                        <div><span>MPG:</span> {this.calcMpg()}</div>
                        <div><span>$/gal:</span> ${this.props.entryData.ppg}</div>
                        <div><span>$/mi:</span> ${this.calcPpm()}</div>
                    </div>
                    <div className={`details-right ${(this.state.editing) ? 'editing' : ''}`}>
                        <button className="delete-button" onClick={this.toggleEditing}>delete</button>
                        <a className="delete-confirm" onClick={this.props.deleteEntry} data-id={this.props.entryData.key}>sure?</a>
                        <a className="delete-cancel" onClick={this.toggleEditing}>cancel</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Entry;
