import Reflux from 'reflux'

var Actions = Reflux.createActions([
    "fetchEntities",
    "selectEntity",
    "selectAllAttributes",
    "deselectAllAttributes",
    "attributeSelectionChange"
]);

module.exports = Actions;
