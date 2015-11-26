import React, { PropTypes, Component } from 'react'
import {getAtomicAttributes} from '../molgenis/MetaData.js'
import Immutable from 'immutable'
import Checkbox from '../components/Checkbox'

export default class Attributes extends Component {
    render() {
        if (!this.props.attributes) {
            return (<span>No attributes</span>);
        }
        return (
            <ul>
                {this.props.attributes.map((a, i) =>
                    <Attribute name={a.name}
                               label={a.label}
                               visible={a.visible}
                               key={a.name}
                               attributes={a.attributes}
                               selectedAtomicAttributes={this.props.selectedAtomicAttributes}
                               onSelectionChanged={this.props.attributeSelectionChange}/>
                )}
            </ul>
        )
    }
}

Attributes.propTypes = {
    attributes: PropTypes.array.isRequired,
    onSelectionChanged: PropTypes.func.isRequired,
    attributeSelectionChange: PropTypes.array.isRequired
};

class Attribute extends Component {
    render() {
        let compound = this.props.attributes && this.props.attributes.length;
        var selected = false;
        var indeterminate = false;
        var atomicAttributes, selectedAtomicAttributes;
        if (compound) {
            atomicAttributes = Immutable.Set(getAtomicAttributes(this.props.attributes).map(x=>x.name));
            selectedAtomicAttributes =
                Immutable.Set(this.props.selectedAtomicAttributes).intersect(atomicAttributes);
            if (atomicAttributes.size == selectedAtomicAttributes.size) {
                // all children are selected
                selected = true;
            } else {
                if (selectedAtomicAttributes.size > 0) {
                    // some children are selected
                    indeterminate=true;
                    selected=false;
                }
                // none of the children are selected
                selected = false;
            }
        } else {
            selected = this.props.selectedAtomicAttributes.indexOf(this.props.name) >= 0;
        }
        return <li key={this.props.name}>
            <Checkbox checked={selected}
                      indeterminate={indeterminate}
                      onChange={() => {
                    this.props.onSelectionChanged(this.props.name)
                   }}/>
            {this.props.name}
            <ul>
                {(() => {
                    if (compound) {
                        return this.props.attributes.map((a, i)=><Attribute
                            name={a.name}
                            label={a.label}
                            visible={a.visible}
                            selected={a.selected}
                            key={a.name}
                            attributes={a.attributes}
                            selectedAtomicAttributes={this.props.selectedAtomicAttributes}
                            onSelectionChanged={this.props.onSelectionChanged}/>)
                    }
                })()}
            </ul>
        </li>
    }
}

Attribute.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    attributes: PropTypes.array,
    selectedAtomicAttributes: PropTypes.array.isRequired,
    onSelectionChanged: PropTypes.func.isRequired
};


