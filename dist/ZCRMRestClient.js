"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var OAuth_1 = require("./OAuth");
var crmapi_1 = require("./crmapi");
function initialise(configJSON) {
    var client_id = null;
    var client_secret = null;
    var redirect_url = null;
    var user_identifier = null;
    var mysql_module;
    var iamurl = 'accounts.zoho.com';
    var baseURL = 'www.zohoapis.com';
    var version = 'v2';
    return new Promise(function (resolve, reject) {
        client_id = configJSON.client_id;
        client_secret = configJSON.client_secret;
        redirect_url = configJSON.redirect_url;
        iamurl = configJSON.iamurl ? configJSON.iamurl : iamurl;
        mysql_module = configJSON.mysql_module
            ? configJSON.mysql_module
            : mysql_module;
        baseURL = configJSON.baseurl ? configJSON.baseurl : baseURL;
        version = configJSON.version ? configJSON.version : version;
        exports.ZCRMRestClient = {
            generateAuthTokens: function generateAuthTokens(user_identifier, grant_token) {
                return new Promise(function (resolve, reject) {
                    if (!user_identifier) {
                        user_identifier = exports.ZCRMRestClient.userIdentifier;
                    }
                    var config = exports.ZCRMRestClient.getConfig(grant_token);
                    var oauth = OAuth_1.OAuth(config, 'generate_token');
                    var api_url = oauth.constructurl('generate_token');
                    oauth.generateTokens(api_url).then(function (response) {
                        if (response.statusCode != 200) {
                            throw new Error('Problem occured while generating access token from grant token. Response : ' +
                                JSON.stringify(response));
                        }
                        var mysql_util = mysql_module;
                        var resultObj = __assign({}, exports.ZCRMRestClient.parseAndConstructObject(response), { user_identifier: user_identifier });
                        if (resultObj.access_token) {
                            mysql_util.saveOAuthTokens(resultObj).then(function (save_resp) {
                                exports.ZCRMRestClient.setUserIdentifier(user_identifier),
                                    resolve(resultObj);
                            });
                        }
                        else {
                            throw new Error('Problem occured while generating access token and refresh token from grant token.Response : ' +
                                JSON.stringify(response));
                        }
                    });
                });
            },
            generateAuthTokenfromRefreshToken: function generateAuthTokenfromRefreshToken(user_identifier, refresh_token) {
                return new Promise(function (resolve, reject) {
                    if (!user_identifier) {
                        user_identifier = exports.ZCRMRestClient.userIdentifier;
                    }
                    var config = exports.ZCRMRestClient.getConfig_refresh(refresh_token);
                    var oauth = OAuth_1.OAuth(config, 'refresh_access_token');
                    var api_url = oauth.constructurl('generate_token');
                    oauth.generateTokens(api_url).then(function (response) {
                        if (response.statusCode != 200) {
                            throw new Error('Problem occured while generating access token from refresh token . Response : ' +
                                JSON.stringify(response));
                        }
                        var mysql_util = mysql_module;
                        var resultObj = __assign({}, exports.ZCRMRestClient.parseAndConstructObject(response), { user_identifier: user_identifier,
                            refresh_token: refresh_token });
                        if (resultObj.access_token) {
                            mysql_util
                                .saveOAuthTokens(resultObj)
                                .then(function (save_response) {
                                exports.ZCRMRestClient.setUserIdentifier(user_identifier),
                                    resolve(resultObj);
                            });
                        }
                        else {
                            throw new Error('Problem occured while generating access token from refresh token. Response : ' +
                                JSON.stringify(response));
                        }
                    });
                });
            },
            getConfig: function getConfig(grant_token) {
                return {
                    client_id: exports.ZCRMRestClient.clientId,
                    client_secret: exports.ZCRMRestClient.clientSecret,
                    code: grant_token,
                    redirect_uri: exports.ZCRMRestClient.redirectURL,
                    grant_type: 'authorization_code',
                };
            },
            getConfig_refresh: function getConfig_refresh(refresh_token) {
                return {
                    client_id: exports.ZCRMRestClient.clientId,
                    client_secret: exports.ZCRMRestClient.clientSecret,
                    refresh_token: refresh_token,
                    grant_type: 'refresh_token',
                };
            },
            setClientId: function setClientId(clientid) {
                client_id = clientid;
            },
            setClientSecret: function setClientSecret(clientSecret) {
                client_secret = clientSecret;
            },
            setRedirectURL: function setRedirectURL(redirectURL) {
                redirect_url = redirect_url;
            },
            setUserIdentifier: function setUserIdentifier(userIdentifier) {
                user_identifier = userIdentifier;
            },
            setIAMUrl: function setIAMUrl(iam_url) {
                iamurl = iam_url;
            },
            setBaseURL: function setBaseURL(baseurl) {
                baseURL = baseurl;
            },
            parseAndConstructObject: function parseAndConstructObject(response) {
                var body = JSON.parse(response['body']);
                var date = new Date();
                var current_time = date.getTime();
                return {
                    access_token: body.access_token !== undefined ? body.access_token : undefined,
                    refresh_token: body.access_token !== undefined && body.refresh_token !== undefined
                        ? body.refresh_token
                        : undefined,
                    expiry_time: body.access_token !== undefined && body.expires_in !== undefined
                        ? body.expires_in + current_time
                        : undefined,
                };
            },
            API: crmapi_1.API(),
            get clientId() {
                return client_id;
            },
            get clientSecret() {
                return client_secret;
            },
            get redirectURL() {
                return redirect_url;
            },
            get userIdentifier() {
                return user_identifier;
            },
            get storageModule() {
                return mysql_module;
            },
            get apiURL() {
                return baseURL;
            },
            get version() {
                return version;
            },
            get IAMUrl() {
                return iamurl;
            },
        };
        exports.ZCRMRestClient.setClientId(client_id);
        exports.ZCRMRestClient.setClientSecret(client_secret);
        exports.ZCRMRestClient.setRedirectURL(redirect_url);
        resolve(exports.ZCRMRestClient);
    });
}
exports.initialise = initialise;
//# sourceMappingURL=ZCRMRestClient.js.map