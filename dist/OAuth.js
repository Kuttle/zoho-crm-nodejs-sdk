"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qs = require("querystring");
var httpclient = require("request");
var ZCRMRestClient_1 = require("./ZCRMRestClient");
var actionvsurl = {
    generate_token: '/oauth/v2/token',
};
var mand_configurations = {
    generate_token: [
        'client_id',
        'client_secret',
        'redirect_uri',
        'code',
        'grant_type',
    ],
    refresh_access_token: [
        'client_id',
        'client_secret',
        'grant_type',
        'refresh_token',
    ],
};
function OAuth(configuration, action) {
    var config;
    function assertConfigAttributesAreSet(configuration, attributes) {
        attributes.forEach(function (attribute) {
            if (!configuration[attribute])
                throw new Error('Missing configuration for Zoho OAuth service: ' + attribute);
        });
    }
    if (!configuration)
        throw new Error('Missing configuration for Zoho OAuth2 service');
    assertConfigAttributesAreSet(configuration, mand_configurations[action]);
    config = configuration;
    return {
        constructurl: function constructurl(action) {
            var url = 'https://' +
                ZCRMRestClient_1.ZCRMRestClient.IAMUrl +
                actionvsurl[action] +
                '?' +
                qs.stringify(config);
            return url;
        },
        generateTokens: function generateTokens(url) {
            return new Promise(function (resolve, reject) {
                httpclient.post(url, {}, function (err, response) {
                    var resultObj = {};
                    if (err) {
                        resolve(err);
                    }
                    resolve(response);
                });
            });
        },
    };
}
exports.OAuth = OAuth;
//# sourceMappingURL=OAuth.js.map