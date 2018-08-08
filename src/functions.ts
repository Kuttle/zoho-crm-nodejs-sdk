import { HTTP_METHODS } from './commonInterfaces';
import { promiseResponse, constructRequestDetails } from './util';
var url = 'functions/{api_name}/actions/execute';

export interface IFunctions {
  executeFunctionsInGet(input): Promise<any>;
  executeFunctionsInPost(input): Promise<any>;
}

export function functions(): IFunctions {
  return {
    executeFunctionsInGet: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(input, url, HTTP_METHODS.GET, true)
      ); //No I18N
    },

    executeFunctionsInPost: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(input, url, HTTP_METHODS.POST, true)
      ); //No I18N
    },
  };
}
