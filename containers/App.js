import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectEntity, fetchEntities,
    attributeSelectionChange, deselectAllAttributes, selectAllAttributes } from '../actions'
import Picker from '../components/Picker'
import Attributes from '../components/Attributes'
import Data from '../components/Data'

class App extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleAttributeSelectionChange =
            this.handleAttributeSelectionChange.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(fetchEntities())
    }

    componentWillReceiveProps(nextProps) {
    }

    handleChange(entity) {
        this.props.dispatch(selectEntity(entity))
    }

    handleAttributeSelectionChange(attributeName) {
        this.props.dispatch(attributeSelectionChange(attributeName))
    }

    render() {
        const { entity, entities, attributes, selectedAtomicAttributes, items} = this.props
        return (
            <div>
                <Picker value={entity}
                        onChange={this.handleChange}
                        options={entities}/>
                <div>
                    <input type="button"
                           onClick={()=>this.props.dispatch(selectAllAttributes())}
                           value="Select all" key="select"/>
                    <input type="button"
                           onClick={()=>this.props.dispatch(deselectAllAttributes())}
                           value="Deselect all" key="deselect"/>
                </div>
                <Attributes attributes={attributes}
                            selectedAtomicAttributes={selectedAtomicAttributes}
                            attributeSelectionChange={this.handleAttributeSelectionChange}/>
                {items &&
                <Data items={items} attributes={selectedAtomicAttributes}/>}
            </div>
        )
    }
}

App.propTypes = {
    selectedEntity: PropTypes.string,
    entities: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    attributes: PropTypes.array,
    selectedAtomicAttributes: PropTypes.array,
    items: PropTypes.array
}

function mapStateToProps(state) {
    const { entity, entities, metaData, selectedAtomicAttributes, items } = state

    return {
        entity,
        entities: entities.map(e=> {
            return {
                'id': e.fullName, 'label': e.label
            }
        }),
        attributes: metaData && metaData.attributes,
        selectedAtomicAttributes,
        items
    }
}

export default connect(mapStateToProps)(App)
