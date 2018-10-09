import React from 'react';
import Entry from '../entry/Entry';
import LineChart from 'react-linechart';

import './ListPage.less';

class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
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
        let crvTotalFillups = 0;
        let crvFirstDate = null;

        let odysseyMaxCost = 0;
        let odysseyTotalCost = 0;
        let odysseyMaxMiles = 0;
        let odysseyTotalMiles = 0;
        let odysseyMaxGallons = 0;
        let odysseyTotalGallons = 0;
        let odysseyTotalFillups = 0;
        let odysseyFirstDate = null;

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
                if (!crvFirstDate) {
                    crvFirstDate = entryData.date;
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
                if (!odysseyFirstDate) {
                    odysseyFirstDate = entryData.date;
                }
            }
        });

        let crvMonthsSinceFirstFillup = ((new Date()).getTime() - (new Date(crvFirstDate)).getTime()) / 1000 / 60 / 60 / 24 / 30.52;
        let odysseyMonthsSinceFirstFillup = ((new Date()).getTime() - (new Date(odysseyFirstDate)).getTime()) / 1000 / 60 / 60 / 24 / 30.52;
        // let year = (new Date(`${entryData.date} mdt`)).getFullYear();
        // if (!crvMonthTotals[`y${year}m${month}`]) {
        //     crvMonthTotals[`y${year}m${month}`] = [];
        // }
        // crvMonthTotals[`y${year}m${month}`].push(Number(entryData.total));


        this.setState({
            entries: this.props.entries,
            crvMaxCost,
            crvTotalCost,
            crvMaxMiles,
            crvTotalMiles,
            crvMaxGallons,
            crvTotalGallons,
            crvTotalFillups,
            crvMonthsSinceFirstFillup,
            odysseyMaxCost,
            odysseyTotalCost,
            odysseyMaxMiles,
            odysseyTotalMiles,
            odysseyMaxGallons,
            odysseyTotalGallons,
            odysseyTotalFillups,
            odysseyMonthsSinceFirstFillup
        });
    }
    // getMonthlyAverageCost = monthlyFillups => {
    //     monthlyFillups.reduce((accumulator, currentValue) => {
    //
    //     });
    // }
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
        let previous = 0;
        const entries = orderedArray.reduce((accumulator, entryData) => {
            if (this.state.filter) {
                if (this.state.filter === entryData.vehicle) {
                    entryData.previous = previous;
                    accumulator.push(<Entry
                        key={entryData['.key']}
                        entryData={entryData}
                        deleteEntry={this.props.deleteEntry}
                    />);
                    previous = entryData.miles;
                }
            } else {
                accumulator.push(<Entry
                    key={entryData['.key']}
                    entryData={entryData}
                    deleteEntry={this.props.deleteEntry}
                />);
            }

            return accumulator;
        }, []);

        return entries;
    };
    filter = function(filter) {
        this.setState({
            ...this.state,
            filter
        });
    };
    buildGraphData = () => {
        const data = [
          {
            label: "Odyssey",
            data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
          },
          {
            label: "CRV",
            data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
          }
        ];

        return data;
    }
    render() {
        return (
            <div className="list-page">
                <h3>Stats</h3>
                <div className="graphContainer">
                    <LineChart
                        width={600}
                        height={400}
                        data={[
                            {
                                color: "steelblue",
                                points: [{x: 1, y: 2}, {x: 3, y: 5}, {x: 7, y: -3}]
                            }
                        ]}
                    />
                </div>
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
                            <span>${(Math.round(this.state.crvTotalCost / this.state.crvMonthsSinceFirstFillup * 1000) / 1000).toFixed(2)}</span>
                        </div>
                        <div className="stats-row">
                            <span>Avg $/fillup:</span>
                            <span>${(Math.round(this.state.crvTotalCost / this.state.crvTotalFillups * 1000) / 1000).toFixed(2)}</span>
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
                            <span>${(Math.round(this.state.odysseyTotalCost / this.state.odysseyMonthsSinceFirstFillup * 1000) / 1000).toFixed(2)}</span>
                        </div>
                        <div className="stats-row">
                            <span>Avg $/fillup:</span>
                            <span>${(Math.round(this.state.odysseyTotalCost / this.state.odysseyTotalFillups * 1000) / 1000).toFixed(2)}</span>
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
                <h3>Fillups <button onClick={() => this.filter('')}>All</button><button onClick={() => this.filter('crv')}>CRV</button><button onClick={() => this.filter('odyssey')}>Odyssey</button></h3>
                {this.state && this.state.entries.length &&
                    this.buildEntries()
                }
            </div>
        );
    }
}

export default ListPage;
