import { OAuth, IOAuth, IRefreshAccessToken, IGenerateToken } from './OAuth';
import { IStorage, ITokenObj } from './commonInterfaces';
import { API, IAPI } from './crmapi';

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
  generateAuthTokens(
    user_identifier: string,
    grant_token: string
  ): Promise<any>;
  generateAuthTokenfromRefreshToken(
    user_identifier: string,
    refresh_token: string
  ): Promise<ITokenObj>;
  getConfig(grant_token: string): IGenerateToken;
  getConfig_refresh(refresh_token: string): IRefreshAccessToken;
  setClientId(clientid: string);
  setClientSecret(clientSecret: string);
  setRedirectURL(redirectURL: string);
  setUserIdentifier(userIdentifier: string);
  setIAMUrl(iam_url: string);
  setBaseURL(baseurl: string);
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

export let ZCRMRestClient: IZCRMRestClient;

export function initialise(configJSON: IConfigJSON): Promise<IZCRMRestClient> {
  var client_id = null;
  var client_secret = null;
  var redirect_url = null;
  var user_identifier = null;
  var mysql_module: IStorage;
  var iamurl = 'accounts.zoho.com';
  var baseURL = 'www.zohoapis.com';
  var version = 'v2';

  return new Promise(function(resolve, reject) {
    client_id = configJSON.client_id;
    client_secret = configJSON.client_secret;
    redirect_url = configJSON.redirect_url;
    iamurl = configJSON.iamurl ? configJSON.iamurl : iamurl;
    mysql_module = configJSON.mysql_module
      ? configJSON.mysql_module
      : mysql_module;

    baseURL = configJSON.baseurl ? configJSON.baseurl : baseURL;
    version = configJSON.version ? configJSON.version : version;

    ZCRMRestClient = {
      generateAuthTokens: function generateAuthTokens(
        user_identifier: string,
        grant_token: string
      ): Promise<ITokenObj> {
        return new Promise(function(resolve, reject) {
          if (!user_identifier) {
            user_identifier = ZCRMRestClient.userIdentifier;
          }

          const config = ZCRMRestClient.getConfig(grant_token);
          const oauth: IOAuth = OAuth(config, 'generate_token');
          const api_url: string = oauth.constructurl('generate_token');

          oauth.generateTokens(api_url).then(function(response) {
            if (response.statusCode != 200) {
              throw new Error(
                'Problem occured while generating access token from grant token. Response : ' +
                  JSON.stringify(response)
              );
            }

            const mysql_util: IStorage = mysql_module;
            var resultObj: ITokenObj = {
              ...ZCRMRestClient.parseAndConstructObject(response),
              user_identifier,
            } as ITokenObj;

            if (resultObj.access_token) {
              mysql_util.saveOAuthTokens(resultObj).then(function(save_resp) {
                ZCRMRestClient.setUserIdentifier(user_identifier),
                  resolve(resultObj);
              });
            } else {
              throw new Error(
                'Problem occured while generating access token and refresh token from grant token.Response : ' +
                  JSON.stringify(response)
              );
            }
          });
        });
      },
      generateAuthTokenfromRefreshToken: function generateAuthTokenfromRefreshToken(
        user_identifier: string,
        refresh_token: string
      ): Promise<ITokenObj> {
        return new Promise(function(resolve, reject) {
          if (!user_identifier) {
            user_identifier = ZCRMRestClient.userIdentifier;
          }

          var config: IRefreshAccessToken = ZCRMRestClient.getConfig_refresh(
            refresh_token
          );
          const oauth: IOAuth = OAuth(config, 'refresh_access_token');
          const api_url: string = oauth.constructurl('generate_token');

          oauth.generateTokens(api_url).then(function(response) {
            if (response.statusCode != 200) {
              throw new Error(
                'Problem occured while generating access token from refresh token . Response : ' +
                  JSON.stringify(response)
              );
            }
            const mysql_util: IStorage = mysql_module;
            const resultObj: ITokenObj = {
              ...ZCRMRestClient.parseAndConstructObject(response),
              user_identifier,
              refresh_token,
            } as ITokenObj;

            if (resultObj.access_token) {
              mysql_util
                .saveOAuthTokens(resultObj)
                .then(function(save_response) {
                  ZCRMRestClient.setUserIdentifier(user_identifier),
                    resolve(resultObj);
                });
            } else {
              throw new Error(
                'Problem occured while generating access token from refresh token. Response : ' +
                  JSON.stringify(response)
              );
            }
          });
        });
      },
      getConfig: function getConfig(grant_token: string): IGenerateToken {
        return {
          client_id: ZCRMRestClient.clientId,
          client_secret: ZCRMRestClient.clientSecret,
          code: grant_token,
          redirect_uri: ZCRMRestClient.redirectURL,
          grant_type: 'authorization_code',
        };
      },
      getConfig_refresh: function getConfig_refresh(
        refresh_token: string
      ): IRefreshAccessToken {
        return {
          client_id: ZCRMRestClient.clientId,
          client_secret: ZCRMRestClient.clientSecret,
          refresh_token: refresh_token,
          grant_type: 'refresh_token',
        };
      },
      setClientId: function setClientId(clientid: string) {
        client_id = clientid;
      },
      setClientSecret: function setClientSecret(clientSecret: string) {
        client_secret = clientSecret;
      },
      setRedirectURL: function setRedirectURL(redirectURL: string) {
        redirect_url = redirect_url;
      },
      setUserIdentifier: function setUserIdentifier(userIdentifier: string) {
        user_identifier = userIdentifier;
      },
      setIAMUrl: function setIAMUrl(iam_url: string) {
        iamurl = iam_url;
      },
      setBaseURL: function setBaseURL(baseurl: string) {
        baseURL = baseurl;
      },

      parseAndConstructObject: function parseAndConstructObject(
        response: IResponse
      ): Partial<ITokenObj> {
        const body: IResponseObj = JSON.parse(response['body']);

        var date = new Date();
        var current_time = date.getTime();

        return {
          access_token:
            body.access_token !== undefined ? body.access_token : undefined,
          refresh_token:
            body.access_token !== undefined && body.refresh_token !== undefined
              ? body.refresh_token
              : undefined,
          expiry_time:
            body.access_token !== undefined && body.expires_in !== undefined
              ? body.expires_in + current_time
              : undefined,
        };
      },
      API: API(),

      get clientId(): string {
        return client_id;
      },
      get clientSecret(): string {
        return client_secret;
      },
      get redirectURL(): string {
        return redirect_url;
      },
      get userIdentifier(): string {
        return user_identifier;
      },
      get storageModule(): IStorage {
        return mysql_module;
      },
      get apiURL(): string {
        return baseURL;
      },
      get version(): string {
        return version;
      },
      get IAMUrl(): string {
        return iamurl;
      },
    };
    ZCRMRestClient.setClientId(client_id);
    ZCRMRestClient.setClientSecret(client_secret);
    ZCRMRestClient.setRedirectURL(redirect_url);
    resolve(ZCRMRestClient);
  });
}
