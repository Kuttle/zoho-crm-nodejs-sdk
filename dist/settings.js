"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var commonInterfaces_1 = require("./commonInterfaces");
function settings() {
    return {
        getFields: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, 'settings/fields/{id}', commonInterfaces_1.HTTP_METHODS.GET, true)); //No I18N
        },
        getLayouts: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, 'settings/layouts/{id}', commonInterfaces_1.HTTP_METHODS.GET, true)); //No I18N
        },
        getCustomViews: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, 'settings/custom_views/{id}', commonInterfaces_1.HTTP_METHODS.GET, true)); //No I18N
        },
        updateCustomViews: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, 'settings/custom_views/{id}', commonInterfaces_1.HTTP_METHODS.PUT, true)); //No I18N
        },
        getModules: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, 'settings/modules' +
                (input && input.module ? '/' + input.module : ''), commonInterfaces_1.HTTP_METHODS.GET, false)); //No I18N
        },
        getRoles: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, 'settings/roles/{id}', commonInterfaces_1.HTTP_METHODS.GET, true)); //No I18N
        },
        getProfiles: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, 'settings/profiles/{id}', commonInterfaces_1.HTTP_METHODS.GET, true)); //No I18N
        },
        getRelatedLists: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, 'settings/related_lists/{id}', commonInterfaces_1.HTTP_METHODS.GET, true)); //No I18N
        },
    };
}
exports.settings = settings;
//# sourceMappingURL=settings.js.map