import { IModules, modules } from './modules';
import { ISettings, settings } from './settings';
import { IActions, actions } from './actions';
import { IUsers, users } from './users';
import { IOrg, org } from './org';
import { IAttachments, attachments } from './attachments';
import { IFunctions, functions } from './functions';

export interface IAPI {
  MODULES: IModules;
  SETTINGS: ISettings;
  ACTIONS: IActions;
  USERS: IUsers;
  ORG: IOrg;
  ATTACHMENTS: IAttachments;
  FUNCTIONS: IFunctions;
}
export function API(): IAPI {
  return {
    MODULES: modules(),
    SETTINGS: settings(),
    ACTIONS: actions(),
    USERS: users(),
    ORG: org(),
    ATTACHMENTS: attachments(),
    FUNCTIONS: functions(),
  };
}
