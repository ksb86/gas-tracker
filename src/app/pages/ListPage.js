import React from 'react';
import { connect } from 'react-redux'
import Firebase from 'firebase';
import Entry from '../entry/Entry';

import './ListPage.less';

class ListPage extends React.Component {
    constructor() {
        super();
        this.state = {
            filter: ''
        };
    }
    calculateStats = () => {
        let crvMaxCost = 0;
        let crvTotalCost = 0;
        let crvMaxMiles = 0;
        let crvTotalMiles = 0;
        let crvMaxGallons = 0;
        let crvTotalGallons = 0;
        let crvTotalFillups = 0;
        let crvFirstDate = Date.now();

        let odysseyMaxCost = 0;
        let odysseyTotalCost = 0;
        let odysseyMaxMiles = 0;
        let odysseyTotalMiles = 0;
        let odysseyMaxGallons = 0;
        let odysseyTotalGallons = 0;
        let odysseyTotalFillups = 0;
        let odysseyFirstDate = Date.now();

        this.props.entries.forEach(entryData => {
            if (entryData.vehicle === 'crv') {
                if (Number(entryData.total) > crvMaxCost) {
                    crvMaxCost = Number(entryData.total);
                }
                crvTotalCost += Number(entryData.total);
                crvTotalMiles += Number(entryData.miles);
                crvTotalGallons += (entryData.total / (entryData.ppg));
                if ((entryData.total / (entryData.ppg)) > crvMaxGallons) {
                    crvMaxGallons = (entryData.total / (entryData.ppg));
                }
                if (Number(entryData.miles) > crvMaxMiles) {
                    crvMaxMiles = Number(entryData.miles);
                }
                crvTotalFillups++;
                // get first fillup for crv
                if (entryData.timestamp < crvFirstDate) {
                    crvFirstDate = entryData.timestamp;
                }
            } else if (entryData.vehicle === 'odyssey') {
                if (Number(entryData.total) > odysseyMaxCost) {
                    odysseyMaxCost = Number(entryData.total);
                }
                odysseyTotalCost += Number(entryData.total);
                odysseyTotalMiles += Number(entryData.miles);
                odysseyTotalGallons += (entryData.total / (entryData.ppg));
                if ((entryData.total / (entryData.ppg)) > odysseyMaxGallons) {
                    odysseyMaxGallons = (entryData.total / (entryData.ppg));
                }
                if (Number(entryData.miles) > odysseyMaxMiles) {
                    odysseyMaxMiles = Number(entryData.miles);
                }
                odysseyTotalFillups++;
                // get first fillup for crv
                if (entryData.timestamp < odysseyFirstDate) {
                    odysseyFirstDate = entryData.timestamp;
                }
            }
        });
        let crvMonthsSinceFirstFillup = ((new Date()).getTime() - crvFirstDate) / 1000 / 60 / 60 / 24 / 30.52;
        let odysseyMonthsSinceFirstFillup = ((new Date()).getTime() - odysseyFirstDate) / 1000 / 60 / 60 / 24 / 30.52;

        return {
            crvAvgMpg: (Math.round(crvTotalMiles / crvTotalGallons * 100) / 100).toFixed(1),
            crvAvgCostPerMile: (Math.round(crvTotalCost / crvTotalMiles * 1000) / 1000).toFixed(3),
            crvAvgCostPerMonth: (Math.round(crvTotalCost / crvMonthsSinceFirstFillup * 1000) / 1000).toFixed(2),
            crvAvgCostPerFillup: (Math.round(crvTotalCost / crvTotalFillups * 1000) / 1000).toFixed(2),
            crvMaxFillCost: crvMaxCost.toFixed(2),
            crvMaxGallons: (Math.round(crvMaxGallons * 100) / 100).toFixed(2),
            crvMaxMiles,
            odysseyAvgMpg: (Math.round(odysseyTotalMiles / odysseyTotalGallons * 100) / 100).toFixed(1),
            odysseyAvgCostPerMile: (Math.round(odysseyTotalCost / odysseyTotalMiles * 1000) / 1000).toFixed(3),
            odysseyAvgCostPerMonth: (Math.round(odysseyTotalCost / odysseyMonthsSinceFirstFillup * 1000) / 1000).toFixed(2),
            odysseyAvgCostPerFillup: (Math.round(odysseyTotalCost / odysseyTotalFillups * 1000) / 1000).toFixed(2),
            odysseyMaxFillCost: odysseyMaxCost.toFixed(2),
            odysseyMaxGallons: (Math.round(odysseyMaxGallons * 100) / 100).toFixed(2),
            odysseyMaxMiles
        };
    };

    deleteEntry = e => {
        // delete entry by id from firebase
        return Firebase.database().ref(`${process.env.FB_PATH}/${e.target.dataset.id}`).remove()
    };

    buildEntries = () => {
        let previous = 0;

        return this.props.entries.reduce((accumulator, entryData) => {
            if (this.state.filter) {
                if (this.state.filter === entryData.vehicle) {
                    entryData.previous = previous;
                    accumulator.push(<Entry
                        key={entryData['key']}
                        entryData={entryData}
                        deleteEntry={this.deleteEntry}
                    />);
                    previous = entryData.miles;
                }
            } else {
                accumulator.push(<Entry
                    key={entryData['key']}
                    entryData={entryData}
                    deleteEntry={this.deleteEntry}
                />);
            }

            return accumulator;
        }, []);
    };
    filter = function(filter) {
        this.setState({
            ...this.state,
            filter
        });
    };
    render() {
        const {
            crvAvgMpg,
            crvAvgCostPerMile,
            crvAvgCostPerMonth,
            crvAvgCostPerFillup,
            crvMaxFillCost,
            crvMaxGallons,
            crvMaxMiles,
            odysseyAvgMpg,
            odysseyAvgCostPerMile,
            odysseyAvgCostPerMonth,
            odysseyAvgCostPerFillup,
            odysseyMaxFillCost,
            odysseyMaxGallons,
            odysseyMaxMiles
        } = this.calculateStats();

        return (
            <div className="list-page">
                <h3>Stats</h3>
                <div className="statsContainer">
                    <div>
                        <h4>CRV</h4>
                        <div className="stats-row">
                            <span>Avg mpg:</span>
                            <span>{crvAvgMpg}</span>
                        </div> {/* 00.0 */}
                        <div className="stats-row">
                            <span>Avg $/mi:</span>
                            <span>${crvAvgCostPerMile}</span>
                        </div> {/* 0.000 */}
                        <div className="stats-row">
                            <span>Avg $/month:</span>
                            <span>${crvAvgCostPerMonth}</span>
                        </div>
                        <div className="stats-row">
                            <span>Avg $/fillup:</span>
                            <span>${crvAvgCostPerFillup}</span>
                        </div>
                        <div className="stats-row">
                            <span>Max fill $:</span>
                            <span>${crvMaxFillCost}</span>
                        </div>
                        <div className="stats-row">
                            <span>Max gal:</span>
                            <span>{crvMaxGallons}</span>
                        </div>
                        <div className="stats-row">
                            <span>Max miles:</span>
                            <span>{crvMaxMiles}</span>
                        </div>
                    </div>
                    <div>
                        <h4>Odyssey</h4>
                        <div className="stats-row">
                            <span>Avg mpg:</span>
                            <span>{odysseyAvgMpg}</span>
                        </div> {/* 00.0 */}
                        <div className="stats-row">
                            <span>Avg $/mi:</span>
                            <span>${odysseyAvgCostPerMile}</span>
                        </div> {/* 0.000 */}
                        <div className="stats-row">
                            <span>Avg $/month:</span>
                            <span>${odysseyAvgCostPerMonth}</span>
                        </div>
                        <div className="stats-row">
                            <span>Avg $/fillup:</span>
                            <span>${odysseyAvgCostPerFillup}</span>
                        </div>
                        <div className="stats-row">
                            <span>Max fill $:</span>
                            <span>${odysseyMaxFillCost}</span>
                        </div>
                        <div className="stats-row">
                            <span>Max gal:</span>
                            <span>{odysseyMaxGallons}</span>
                        </div>
                        <div className="stats-row">
                            <span>Max miles:</span>
                            <span>{odysseyMaxMiles}</span>
                        </div>
                    </div>
                </div>
                <h3>Fillups <button onClick={() => this.filter('')}>All</button><button onClick={() => this.filter('crv')}>CRV</button><button onClick={() => this.filter('odyssey')}>Odyssey</button></h3>
                {this.buildEntries()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const orderedArray = [...state.entries];
    orderedArray.sort(function(a, b) {
        if (a.timestamp < b.timestamp) {
            return 1;
        }
        if (a.timestamp > b.timestamp) {
            return -1;
        }
    });

    return {
        entries: orderedArray
    };
};
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
