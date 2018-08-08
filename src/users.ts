import { promiseResponse, constructRequestDetails } from './util';
import { HTTP_METHODS } from './commonInterfaces';
export interface IUsers {
  get(input): Promise<any>;
}
export function users(): IUsers {
  return {
    get: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(input, 'users/{id}', HTTP_METHODS.GET, true)
      ); //No I18N
    },
  };
}
