"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var commonInterfaces_1 = require("./commonInterfaces");
function actions() {
    return {
        convert: function (input) {
            return util_1.promiseResponse(util_1.constructRequestDetails(input, 'Leads/{id}/actions/convert', commonInterfaces_1.HTTP_METHODS.POST, false)); //No I18N
        },
    };
}
exports.actions = actions;
//# sourceMappingURL=actions.js.map