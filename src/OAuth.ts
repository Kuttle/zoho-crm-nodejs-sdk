import * as qs from 'querystring';
import * as httpclient from 'request';
import { ZCRMRestClient } from './ZCRMRestClient';

const actionvsurl = {
  generate_token: '/oauth/v2/token',
};

export interface IGenerateToken {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  code: string;
  grant_type: string;
}

export interface IRefreshAccessToken {
  client_id: string;
  client_secret: string;
  redirect_url?: string;
  grant_type: string;
  refresh_token: string;
}

const mand_configurations: {
  generate_token: string[];
  refresh_access_token: string[];
} = {
  generate_token: [
    'client_id',
    'client_secret',
    'redirect_uri',
    'code',
    'grant_type',
  ],
  refresh_access_token: [
    'client_id',
    'client_secret',
    'grant_type',
    'refresh_token',
  ],
};

export interface IOAuth {
  constructurl(action: string): string;
  generateTokens(url: string): Promise<any>;
}

export function OAuth(
  configuration: IRefreshAccessToken | IGenerateToken,
  action: 'generate_token' | 'refresh_access_token'
): IOAuth {
  let config: IRefreshAccessToken | IGenerateToken;

  function assertConfigAttributesAreSet(
    configuration: IRefreshAccessToken | IGenerateToken,
    attributes: string[]
  ) {
    attributes.forEach(function(attribute) {
      if (!configuration[attribute])
        throw new Error(
          'Missing configuration for Zoho OAuth service: ' + attribute
        );
    });
  }

  if (!configuration)
    throw new Error('Missing configuration for Zoho OAuth2 service');
  assertConfigAttributesAreSet(configuration, mand_configurations[action]);
  config = configuration;

  return {
    constructurl: function constructurl(action: string) {
      var url =
        'https://' +
        ZCRMRestClient.IAMUrl +
        actionvsurl[action] +
        '?' +
        qs.stringify(config);
      return url;
    },
    generateTokens: function generateTokens(url: string) {
      return new Promise(function(resolve, reject) {
        httpclient.post(url, {}, function(err, response) {
          var resultObj = {};

          if (err) {
            resolve(err);
          }
          resolve(response);
        });
      });
    },
  };
}
