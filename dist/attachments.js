"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var commonInterfaces_1 = require("./commonInterfaces");
function attachments() {
    return {
        uploadFile: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, input.module + '/{id}/Attachments', commonInterfaces_1.HTTP_METHODS.POST, false)); //No I18N
        },
        deleteFile: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, input.module + '/{id}/Attachments/' + input.relatedId, commonInterfaces_1.HTTP_METHODS.DELETE, false)); //No I18N
        },
        downloadFile: function (input) {
            input.download_file = true;
            return util_1.promiseResponse(util_1.constructRequestDetails(input, input.module + '/{id}/Attachments/' + input.relatedId, commonInterfaces_1.HTTP_METHODS.GET, false)); //No I18N
        },
        uploadLink: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, input.module + '/{id}/Attachments', commonInterfaces_1.HTTP_METHODS.POST, false)); //No I18N
        },
        uploadPhoto: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, input.module + '/{id}/photo', commonInterfaces_1.HTTP_METHODS.POST, false)); //No I18N
        },
        downloadPhoto: function (input) {
            input.download_file = true;
            return util_1.promiseResponse(util_1.constructRequestDetails(input, input.module + '/{id}/photo', commonInterfaces_1.HTTP_METHODS.GET, false)); //No I18N
        },
        deletePhoto: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, input.module + '/{id}/photo', commonInterfaces_1.HTTP_METHODS.DELETE, false)); //No I18N
        },
    };
}
exports.attachments = attachments;
//# sourceMappingURL=attachments.js.map