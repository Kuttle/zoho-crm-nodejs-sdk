import { ZCRMRestClient, IZCRMRestClient } from './ZCRMRestClient';
import { IOAuth, OAuth, IRefreshAccessToken } from './OAuth';
import {
  IStorage,
  IGetAuthTokenResult,
  HTTP_METHODS,
} from './commonInterfaces';
export function promiseResponse(request): Promise<any> {
  const crmclient: IZCRMRestClient = ZCRMRestClient;

  return new Promise(function(resolve, reject) {
    const storageUtil: IStorage = crmclient.storageModule;
    storageUtil
      .getOAuthTokens(crmclient.userIdentifier)
      .then(function(response: IGetAuthTokenResult[]) {
        const date: Date = new Date();
        const current_time: number = date.getTime();

        const expires_in: number = response[0].expirytime;
        const refresh_token: string = response[0].refreshtoken;

        if (current_time > expires_in) {
          const config: IRefreshAccessToken = crmclient.getConfig_refresh(
            refresh_token
          );
          const oauth: IOAuth = OAuth(config, 'refresh_access_token');
          const url = oauth.constructurl('generate_token');

          oauth.generateTokens(url).then(function(response) {
            const result_obj = crmclient.parseAndConstructObject(response);

            storageUtil.updateOAuthTokens(result_obj).then(function(response) {
              makeapicall(request).then(function(response) {
                resolve(response);
              });
            });
          });
        } else {
          makeapicall(request).then(function(response) {
            resolve(response);
          });
        }
      });
  });
}

function makeapicall(request): Promise<any> {
  return new Promise(function(resolve, reject) {
    const crmclient: IZCRMRestClient = ZCRMRestClient;
    const httpclient = require('request');
    const storageUtil: IStorage = crmclient.storageModule;
    const qs = require('querystring');

    storageUtil
      .getOAuthTokens(crmclient.userIdentifier)
      .then(function(result_obj) {
        const access_token: string = result_obj[0].accesstoken;
        let baseUrl: string =
          'https://' +
          crmclient.apiURL +
          '/crm/' +
          crmclient.version +
          '/' +
          request.url;
        if (request.params) {
          baseUrl = baseUrl + '?' + request.params;
        }

        let api_headers: any = {};
        let encoding: string = 'utf8';
        let req_body = null;
        let formData = null;

        if (request.download_file) {
          encoding = 'binary'; //No I18N
        }

        var form_Data = null;

        if (request.x_file_content) {
          const FormData = require('form-data');
          form_Data = new FormData();
          form_Data.append('file', request.x_file_content); //No I18N
          req_body = form_Data;
          api_headers = form_Data.getHeaders();
        } else {
          req_body = request.body || null;
        }

        if (request.headers) {
          const header_keys = Object.keys(request.headers);
          header_keys.forEach(key => {
            api_headers[key] = request.headers[key];
          });
        }

        api_headers.Authorization = 'Zoho-oauthtoken ' + access_token;
        api_headers['User-Agent'] = 'Zoho CRM Node SDK';

        httpclient(
          {
            uri: baseUrl,
            method: request.type,
            headers: api_headers,
            body: req_body,
            encoding: encoding,
          },
          function(error, response, body) {
            if (error) {
              resolve(error);
            }

            if (response.statusCode == 204) {
              const respObj = {
                message: 'no data', //No I18N
                status_code: '204', //No I18N
              };
              resolve(JSON.stringify(respObj));
            } else {
              if (request.download_file) {
                var filename;
                var disposition = response.headers['content-disposition']; //No I18N
                if (disposition && disposition.indexOf('attachment') !== -1) {
                  var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                  var matches = filenameRegex.exec(disposition);
                  if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                    filename = filename.replace('UTF-8', '');
                  }
                }

                response.filename = filename;
                resolve(response);
              } else {
                resolve(response);
              }
            }
          }
        );
      });
  });
}

function createParams(parameters) {
  var params, key;
  for (key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      if (params) {
        params = params + key + '=' + parameters[key] + '&';
      } else {
        params = key + '=' + parameters[key] + '&';
      }
    }
  }

  return params;
}

export function constructRequestDetails(input, url, type, isModuleParam) {
  var requestDetails: any = { type };

  if (input != undefined) {
    if (input.id) {
      url = url.replace('{id}', input.id);
    } else {
      url = url.replace('/{id}', '');
    }
    if (input.api_name) {
      url = url.replace('{api_name}', input.api_name);

      var params: any = {};
      if (input.params) {
        params = input.params;
      }
      params.auth_type = 'oauth';
      input.params = params;
    } else {
      url = url.replace('/{api_name}', '');
    }
    if (input.params) {
      requestDetails.params =
        createParams(input.params) +
        (input.module && isModuleParam ? 'module=' + input.module : ''); //No I18N
    }
    if (!requestDetails.params && isModuleParam) {
      requestDetails.params = 'module=' + input.module; //No I18N
    }
    if (input.body && (type == HTTP_METHODS.POST || type == HTTP_METHODS.PUT)) {
      requestDetails.body = JSON.stringify(input.body);
    }
    if (input.x_file_content) {
      requestDetails.x_file_content = input.x_file_content;
    }
    if (input.download_file) {
      requestDetails.download_file = input.download_file;
    }
    if (input.headers) {
      requestDetails.headers = input.headers;
    }
  }
  requestDetails.url = url;

  return requestDetails;
}
