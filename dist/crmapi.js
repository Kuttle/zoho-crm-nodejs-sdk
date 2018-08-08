'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var modules_1 = require('./modules');
var settings_1 = require('./settings');
var actions_1 = require('./actions');
var users_1 = require('./users');
var org_1 = require('./org');
var attachments_1 = require('./attachments');
var functions_1 = require('./functions');
function API() {
  return {
    MODULES: modules_1.modules(),
    SETTINGS: settings_1.settings(),
    ACTIONS: actions_1.actions(),
    USERS: users_1.users(),
    ORG: org_1.org(),
    ATTACHMENTS: attachments_1.attachments(),
    FUNCTIONS: functions_1.functions(),
  };
}
exports.API = API;
//# sourceMappingURL=crmapi.js.map
