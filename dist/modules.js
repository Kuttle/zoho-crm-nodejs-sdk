"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var commonInterfaces_1 = require("./commonInterfaces");
function modules() {
    return {
        get: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, input.module + '/{id}', commonInterfaces_1.HTTP_METHODS.GET, false)); //No I18N
        },
        post: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, input.module + '/{id}', commonInterfaces_1.HTTP_METHODS.POST, false)); //No I18N
        },
        put: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, input.module + '/{id}', commonInterfaces_1.HTTP_METHODS.PUT, false)); //No I18N
        },
        delete: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, input.module + '/{id}', commonInterfaces_1.HTTP_METHODS.DELETE, false)); //No I18N
        },
        getAllDeletedRecords: function (input) {
            if (input.params) {
                input.params.type = 'all';
            }
            else {
                input.params = {
                    type: 'all',
                };
            }
            return util_1.promiseResponse(util_1.constructRequestDetails(input, input.module + '/deleted', commonInterfaces_1.HTTP_METHODS.GET, false)); //No I18N
        },
        getRecycleBinRecords: function (input) {
            if (input.params) {
                input.type = 'recycle';
            }
            else {
                input.params = {
                    type: 'recycle',
                };
            }
            return util_1.promiseResponse(util_1.constructRequestDetails(input, input.module + '/deleted', commonInterfaces_1.HTTP_METHODS.GET, false)); //No I18N
        },
        getPermanentlyDeletedRecords: function (input) {
            if (input.params) {
                input.type = 'permanent';
            }
            else {
                input.params = {
                    type: 'permanent',
                };
            }
            return util_1.promiseResponse(util_1.constructRequestDetails(input, input.module + '/deleted', commonInterfaces_1.HTTP_METHODS.GET, false)); //No I18N
        },
        search: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, input.module + '/search', commonInterfaces_1.HTTP_METHODS.GET, false)); //No I18N
        },
    };
}
exports.modules = modules;
//# sourceMappingURL=modules.js.map