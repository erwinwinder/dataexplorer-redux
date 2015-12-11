import React, { Component, PropTypes } from 'react'

export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props

    return (
      <span>
          {value && <h1>{value.label}</h1>}
          {value && <p>{value.description}</p>}

        <select onChange={e => onChange(options.find(o=> e.target.value === o.fullName))}
                value={value && value.fullName}>
          {options.map(option =>
            <option value={option.fullName} key={option.fullName}>
              {option.label}
            </option>)
          }
        </select>

      </span>
    )
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired
}
