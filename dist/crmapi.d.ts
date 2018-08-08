import { IModules } from './modules';
import { ISettings } from './settings';
import { IActions } from './actions';
import { IUsers } from './users';
import { IOrg } from './org';
import { IAttachments } from './attachments';
import { IFunctions } from './functions';
export interface IAPI {
    MODULES: IModules;
    SETTINGS: ISettings;
    ACTIONS: IActions;
    USERS: IUsers;
    ORG: IOrg;
    ATTACHMENTS: IAttachments;
    FUNCTIONS: IFunctions;
}
export declare function API(): IAPI;
