import fetch from 'isomorphic-fetch'
import RestClient from '../molgenis/RestClient.js'

export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES'
export const SELECT_ENTITY = 'SELECT_ENTITY'
export const RECEIVE_META_DATA = 'RECEIVE_META_DATA'
export const SELECT_ALL_ATTRIBUTES = 'SELECT_ALL_ATTRIBUTES'
export const DESELECT_ALL_ATTRIBUTES = 'DESELECT_ALL_ATTRIBUTES'
export const ATTRIBUTE_SELECTION_CHANGE = 'ATTRIBUTE_SELECTION_CHANGE'

let restClient = new RestClient();

export function receiveEntities(entities) {
    return {
        type: RECEIVE_ENTITIES,
        entities
    }
}

export function selectAllAttributes() {
    return {
        type: SELECT_ALL_ATTRIBUTES
    }
}

export function deselectAllAttributes() {
    return {
        type: DESELECT_ALL_ATTRIBUTES
    }
}

/**
 * Asynchronous action that logs in and retrieves the available entities
 */
export function fetchEntities() {
    return dispatch => restClient.login('admin', 'admin', 'https://molgenis01.target.rug.nl/api')
        .then(() => restClient.get('entities', {'attributes': ['simpleName', 'fullName', 'label', 'description']}))
        .then(data => dispatch(receiveEntities(data.items)));
}

function selectedEntity(entity) {
    return {
        type: SELECT_ENTITY,
        entity
    }
}

export function attributeSelectionChange(attributeName) {
    return {
        type: ATTRIBUTE_SELECTION_CHANGE,
        attributeName
    }
}

/**
 * Asynchronous action that selects the entity in the state and retrieves the selected entity's metadata
 */
export function selectEntity(entity) {
    return dispatch => {
        dispatch(selectedEntity(entity));
        return restClient.getMeta(entity)
            .then(meta => {
                dispatch(receiveMetaData(meta));
                dispatch(selectAllAttributes());
            });
    }
}

export function receiveMetaData(metaData) {
    return {
        type: RECEIVE_META_DATA,
        metaData
    }
}
