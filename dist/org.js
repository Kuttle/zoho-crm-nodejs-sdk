"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var commonInterfaces_1 = require("./commonInterfaces");
function org() {
    return {
        get: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, 'org', commonInterfaces_1.HTTP_METHODS.GET, true)); //No I18N
        },
    };
}
exports.org = org;
//# sourceMappingURL=org.js.map