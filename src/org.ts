import { promiseResponse, constructRequestDetails } from './util';
import { HTTP_METHODS } from './commonInterfaces';
export interface IOrg {
  get(input): Promise<any>;
}
export function org(): IOrg {
  return {
    get: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(input, 'org', HTTP_METHODS.GET, true)
      ); //No I18N
    },
  };
}
