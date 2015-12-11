import Reflux from 'reflux'
import Actions from '../actions/Actions.js'
import RestClient from '../molgenis/RestClient.js'
import {getAtomicAttributes, getAllAttributes} from '../molgenis/MetaData.js'
import Immutable from 'immutable'

var DataStore = Reflux.createStore({
    dataSet: {
        data: {
            items: [],
            meta: {
                attributes: []
            }
        },
        selectedAtomicAttributes: [],
        entity: null
    },
    init: function() {
        this.listenTo(Actions.selectEntity, this.onSelectEntity)
        this.listenTo(Actions.attributeSelectionChange, this.onAttributeSelectionChange)
    },
    getInitialState: function() {
        return this.dataSet
    },
    onSelectEntity: function(entity) {
        RestClient
            .getMeta(entity.fullName)
            .then(data => {
                this.dataSet.entity = entity
                this.dataSet.data = data
                this.dataSet.selectedAtomicAttributes = getAtomicAttributes(data.meta.attributes).map(a => a.name)
                this.trigger(this.dataSet)
            })
    },
    onAttributeSelectionChange: function(attributeName) {
        var newSelection, attr, attrs, selection = Immutable.Set(this.dataSet.selectedAtomicAttributes)
        var attributes = this.dataSet.data.meta.attributes

        if (selection.contains(attributeName)) {
            newSelection = selection.remove(attributeName)
        } else {
            attr = getAllAttributes(attributes).find(a => a.name === attributeName)
            if (attr.fieldType === "COMPOUND") {
                // compound attribute, find out if all of its atomic attributes are selected
                attrs = Immutable.Set(getAtomicAttributes(attr.attributes).map(a => a.name))
                if (attrs.intersect(selection).equals(attrs)) {
                    newSelection = selection.subtract(attrs)
                } else {
                    newSelection = selection.union(attrs)
                }
            } else {
                // add atomic attribute to selection
                newSelection = selection.add(attributeName)
            }
        }

        this.dataSet.selectedAtomicAttributes = getAtomicAttributes(attributes)
            .map(a=>a.name)
            .filter(n => newSelection.contains(n))
        this.trigger(this.dataSet);
    }

});

module.exports = DataStore;
