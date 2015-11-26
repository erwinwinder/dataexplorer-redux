import React, { PropTypes, Component } from 'react'

export default class Data extends Component {

    tdValue(obj) {
        if (obj && obj.constructor === Array) {
            return obj.map(this.tdValue).join(",")
        }
        if (obj && obj._href) {
            return obj.label || JSON.stringify(obj);
        }
        return obj;
    }

    render() {
        return (
            <table>
                <thead>
                <tr>
                    {this.props.attributes.map((attr, i)=>
                        <th key={attr}>{attr}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {this.props.items.map((item, i) =>
                    <tr key={i}>
                        {this.props.attributes.map((attr, i)=>
                            <td key={attr}>{this.tdValue(item[attr])}</td>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
        )
    }
}

Data.propTypes = {
    items: PropTypes.array.isRequired,
    attributes: PropTypes.array.isRequired
}
