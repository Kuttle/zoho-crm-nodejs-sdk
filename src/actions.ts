import { promiseResponse, constructRequestDetails } from './util';
import { HTTP_METHODS } from './commonInterfaces';

export interface IActions {
  convert(input): Promise<any>;
}
export function actions(): IActions {
  return {
    convert: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          'Leads/{id}/actions/convert',
          HTTP_METHODS.POST,
          false
        )
      ); //No I18N
    },
  };
}
