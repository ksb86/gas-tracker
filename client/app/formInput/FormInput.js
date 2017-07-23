import React from 'react';

import './FormInput.less';

class FormInput extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="cell">
                <label className="hvr-wobble-horizontal">
                    <span className="label-text">{this.props.label}</span>
                    <input onChange={this.props.onChange} name={this.props.name} value={this.props.value} type={this.props.type} />
                </label>
            </div>
        );
    }
}

export default FormInput;
