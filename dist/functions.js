"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commonInterfaces_1 = require("./commonInterfaces");
var util_1 = require("./util");
var url = 'functions/{api_name}/actions/execute';
function functions() {
    return {
        executeFunctionsInGet: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, url, commonInterfaces_1.HTTP_METHODS.GET, true)); //No I18N
        },
        executeFunctionsInPost: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, url, commonInterfaces_1.HTTP_METHODS.POST, true)); //No I18N
        },
    };
}
exports.functions = functions;
//# sourceMappingURL=functions.js.map