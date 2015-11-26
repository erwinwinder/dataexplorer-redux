import { combineReducers } from 'redux'
import {
    SELECT_ENTITY, RECEIVE_ENTITIES, RECEIVE_META_DATA, SELECT_ALL_ATTRIBUTES,
    DESELECT_ALL_ATTRIBUTES,
    ATTRIBUTE_SELECTION_CHANGE
} from '../actions'
import Immutable from 'immutable'

import {getAtomicAttributes, getAllAttributes} from '../molgenis/MetaData.js'

function entities(state = {
    entities: [],
    entity: null,
    selectedAtomicAttributes: []
}, action) {

    switch (action.type) {
        case RECEIVE_ENTITIES:
            return Object.assign({}, state, {
                entities: action.entities
            });
        case SELECT_ENTITY:
            return Object.assign({}, state, {
                entity: state.entities.find(e => (e.fullName === action.entity ))
            });
        case RECEIVE_META_DATA:
            return Object.assign({}, state, {
                metaData: action.metaData.meta,
                items: action.metaData.items,
                selectedAtomicAttributes: []
            });
        case DESELECT_ALL_ATTRIBUTES:
            return Object.assign({}, state, {
                selectedAtomicAttributes: []
            });
        case SELECT_ALL_ATTRIBUTES:
            return Object.assign({}, state, {
                selectedAtomicAttributes: getAtomicAttributes(state.metaData.attributes).map(a => a.name)
            });
        case ATTRIBUTE_SELECTION_CHANGE:
            var newSelection, attr, attrs, selection = Immutable.Set(state.selectedAtomicAttributes);
            if (selection.contains(action.attributeName)) {
                newSelection = selection.remove(action.attributeName);
            } else {
                attr = getAllAttributes(state.metaData.attributes).find(a => a.name === action.attributeName);
                if (attr.fieldType === "COMPOUND") {
                    // compound attribute, find out if all of its atomic attributes are selected
                    attrs = Immutable.Set(getAtomicAttributes(attr.attributes).map(a => a.name));
                    if (attrs.intersect(selection).equals(attrs)) {
                        newSelection = selection.subtract(attrs);
                    } else {
                        newSelection = selection.union(attrs);
                    }
                } else {
                    // add atomic attribute to selection
                    newSelection = selection.add(action.attributeName);
                }
            }

            return Object.assign({}, state, {
                    selectedAtomicAttributes: getAtomicAttributes(state.metaData.attributes)
                        .map(a=>a.name)
                        .filter(n => newSelection.contains(n))
                }
            )
                ;
        default:
            return state
    }
}

const rootReducer = entities;

export default rootReducer
