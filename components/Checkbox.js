import React, { Component, PropTypes } from 'react'

export default class Checkbox extends Component {
    render() {
        const { checked, onChange } = this.props
        return <input type="checkbox" checked={checked} onChange={onChange}/>
    }

    componentDidUpdate() {
        React.findDOMNode(this).indeterminate = this.props.indeterminate;
    }
}

Checkbox.propTypes = {
    checked: PropTypes.bool,
    indeterminate: PropTypes.bool,
    onChange: PropTypes.func
}


