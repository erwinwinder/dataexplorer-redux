import React, { Component, PropTypes } from 'react'
import Picker from '../components/Picker'
import Attributes from '../components/Attributes'
import Data from '../components/Data'
import EntityStore from '../store/EntityStore'
import DataStore from '../store/DataStore'
import Reflux from 'reflux'
import Actions from '../actions/Actions.js'

var App = React.createClass({
    mixins: [Reflux.connect(EntityStore, "entities"), Reflux.connect(DataStore, "dataSet")],
    componentDidMount: function() {
        Actions.fetchEntities();
    },
    render: function() {
        const { entities, dataSet } = this.state

        return (
            <div>
                <Picker value={dataSet.entity}
                        onChange={Actions.selectEntity}
                        options={entities} />

                <Attributes attributes={dataSet.data.meta.attributes}
                            selectedAtomicAttributes={dataSet.selectedAtomicAttributes}
                            attributeSelectionChange={Actions.attributeSelectionChange} />

                <Data items={dataSet.data.items} attributes={dataSet.selectedAtomicAttributes}/>
            </div>
        )
    }
});

module.exports = App
