"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var commonInterfaces_1 = require("./commonInterfaces");
function users() {
    return {
        get: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, 'users/{id}', commonInterfaces_1.HTTP_METHODS.GET, true)); //No I18N
        },
    };
}
exports.users = users;
//# sourceMappingURL=users.js.map