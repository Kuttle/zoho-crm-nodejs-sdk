import { IRefreshAccessToken, IGenerateToken } from './OAuth';
import { IStorage, ITokenObj } from './commonInterfaces';
import { IAPI } from './crmapi';
export interface IConfigJSON {
    client_id: string;
    client_secret: string;
    redirect_url: string;
    iamurl: string;
    mysql_module: IStorage;
    refresh_token?: string;
    baseurl?: string;
    version?: string;
}
export interface IConfig {
    client_id: string;
    client_secret: string;
    code: string;
    redirect_uri: string;
    grant_type: string;
}
export interface IResponse {
    body: string;
}
export interface IResponseObj {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}
export interface IZCRMRestClient {
    generateAuthTokens(user_identifier: string, grant_token: string): Promise<any>;
    generateAuthTokenfromRefreshToken(user_identifier: string, refresh_token: string): Promise<ITokenObj>;
    getConfig(grant_token: string): IGenerateToken;
    getConfig_refresh(refresh_token: string): IRefreshAccessToken;
    setClientId(clientid: string): any;
    setClientSecret(clientSecret: string): any;
    setRedirectURL(redirectURL: string): any;
    setUserIdentifier(userIdentifier: string): any;
    setIAMUrl(iam_url: string): any;
    setBaseURL(baseurl: string): any;
    parseAndConstructObject(response: IResponse): Partial<ITokenObj>;
    readonly API: IAPI;
    readonly clientId: string;
    readonly clientSecret: string;
    readonly redirectURL: string;
    readonly userIdentifier: string;
    readonly storageModule: IStorage;
    readonly apiURL: string;
    readonly version: string;
    readonly IAMUrl: string;
}
export declare let ZCRMRestClient: IZCRMRestClient;
export declare function initialise(configJSON: IConfigJSON): Promise<IZCRMRestClient>;
