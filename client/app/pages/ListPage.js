import React from 'react';
import Entry from '../entry/Entry';

import './ListPage.less';

class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avgMpg: 0,
            entries: [],

            crvMaxCost: 0,
            crvTotalCost: 0,
            crvMaxMiles: 0,
            crvTotalMiles: 0,
            crvMaxGallons: 0,
            crvTotalGallons: 0,

            odysseyMaxCost: 0,
            odysseyTotalCost: 0,
            odysseyMaxMiles: 0,
            odysseyTotalMiles: 0,
            odysseyMaxGallons: 0,
            odysseyTotalGallons: 0
        }
    }
    componentDidMount() {
        let crvMaxCost = 0;
        let crvTotalCost = 0;
        let crvMaxMiles = 0;
        let crvTotalMiles = 0;
        let crvMaxGallons = 0;
        let crvTotalGallons = 0;

        let odysseyMaxCost = 0;
        let odysseyTotalCost = 0;
        let odysseyMaxMiles = 0;
        let odysseyTotalMiles = 0;
        let odysseyMaxGallons = 0;
        let odysseyTotalGallons = 0;

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
            }
        });

        this.setState({
            entries: this.props.entries,
            crvMaxCost,
            crvTotalCost,
            crvMaxMiles,
            crvTotalMiles,
            crvMaxGallons,
            crvTotalGallons,
            odysseyMaxCost,
            odysseyTotalCost,
            odysseyMaxMiles,
            odysseyTotalMiles,
            odysseyMaxGallons,
            odysseyTotalGallons
        });
    }
    buildEntries = () => {
        var orderedArray = this.state.entries;
        orderedArray.sort(function(a, b) {
            if (a.date < b.date) {
                return 1;
            }
            if (a.date > b.date) {
                return -1;
            }
        });

        const entries = orderedArray.map(entryData => {
            return (
                <Entry
                    key={entryData['.key']}
                    entryData={entryData}
                    deleteEntry={this.props.deleteEntry}
                />
            );
        });

        return entries;
    }
    render() {
        return (
            <div className="list-page">
                <h3>Stats</h3>
                <div className="statsContainer">
                    <div>
                        <h4>CRV</h4>
                        <div className="stats-row">
                            <span>Avg mpg:</span>
                            <span>{(Math.round(this.state.crvTotalMiles / this.state.crvTotalGallons * 100) / 100).toFixed(1)}</span>
                        </div> {/* 00.0 */}
                        <div className="stats-row">
                            <span>Avg $/mi:</span>
                            <span>${(Math.round(this.state.crvTotalCost / this.state.crvTotalMiles * 1000) / 1000).toFixed(3)}</span>
                        </div> {/* 0.000 */}
                        <div className="stats-row">
                            <span>Avg $/month:</span>
                            <span>...</span>
                        </div>
                        <div className="stats-row">
                            <span>Max fill $:</span>
                            <span>${this.state.crvMaxCost.toFixed(2)}</span>
                        </div>
                        <div className="stats-row">
                            <span>Max gal:</span>
                            <span>{(Math.round(this.state.crvMaxGallons * 100) / 100).toFixed(2)}</span>
                        </div>
                        <div className="stats-row">
                            <span>Max miles:</span>
                            <span>{this.state.crvMaxMiles}</span>
                        </div>
                    </div>
                    <div>
                        <h4>Odyssey</h4>
                        <div className="stats-row">
                            <span>Avg mpg:</span>
                            <span>{(Math.round(this.state.odysseyTotalMiles / this.state.odysseyTotalGallons * 100) / 100).toFixed(1)}</span>
                        </div> {/* 00.0 */}
                        <div className="stats-row">
                            <span>Avg $/mi:</span>
                            <span>${(Math.round(this.state.odysseyTotalCost / this.state.odysseyTotalMiles * 1000) / 1000).toFixed(3)}</span>
                        </div> {/* 0.000 */}
                        <div className="stats-row">
                            <span>Avg $/month:</span>
                            <span>...</span>
                        </div>
                        <div className="stats-row">
                            <span>Max fill $:</span>
                            <span>${this.state.odysseyMaxCost.toFixed(2)}</span>
                        </div>
                        <div className="stats-row">
                            <span>Max gal:</span>
                            <span>{(Math.round(this.state.odysseyMaxGallons * 100) / 100).toFixed(2)}</span>
                        </div>
                        <div className="stats-row">
                            <span>Max miles:</span>
                            <span>{this.state.odysseyMaxMiles}</span>
                        </div>
                    </div>
                </div>
                <h3>Fillups</h3>
                {this.state && this.state.entries.length &&
                    this.buildEntries()
                }
            </div>
        );
    }
}

export default ListPage;
