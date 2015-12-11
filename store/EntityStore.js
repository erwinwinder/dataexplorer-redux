import Reflux from 'reflux'
import Actions from '../actions/Actions.js'
import RestClient from '../molgenis/RestClient.js'

var EntityStore = Reflux.createStore({
    entities: [],
    getInitialState: function() {
       return this.entities;
    },
    init: function() {
        this.listenTo(Actions.fetchEntities, this.onFetchEntities)
    },
    onFetchEntities: function() {
        RestClient
            .login('admin', 'admin', 'https://molgenis01.target.rug.nl/api')
            .then(() => RestClient.get('entities', {'attributes': ['simpleName', 'fullName', 'label', 'description']}))
            .then(data => {
                this.entities = data.items
                this.trigger(this.entities)
            });
    }
});

module.exports = EntityStore;

