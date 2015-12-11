// molgenis REST API client
import $ from 'jquery';

class RestClientClass {
    get(entity, options) {
        let url = this.apiUrl + '/v1/' + entity;
        if (options.attributes) {
            url = url + "?attributes=" + options.attributes.join(',')
        }
        return $.ajax({url: url, headers: {'x-molgenis-token': this.token}})
    }

    getMeta(entity) {
        let url = this.apiUrl + '/v2/' + entity;
        return $.ajax({url: url, headers: {'x-molgenis-token': this.token}})
    }

    login(username, password, apiUrl) {
        this.apiUrl = apiUrl || this.apiUrl;
        return $.ajax({
            type: 'POST',
            dataType: 'json',
            url: apiUrl + '/v1/login',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: password
            })
        }).then(data => {
            this.token = data.token;
            this.apiUrl = apiUrl;
        });
    }

    logout() {
        return $.ajax({
            url: this.apiUrl + '/v1/logout',
            success: function () {
                this.token = null;
            }
        });
    }
}

var RestClient = new RestClientClass()
module.exports = RestClient;