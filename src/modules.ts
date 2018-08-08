import { promiseResponse, constructRequestDetails } from './util';
import { HTTP_METHODS } from './commonInterfaces';

export interface IModules {
  get(input): Promise<any>;
  post(input): Promise<any>;
  put(input): Promise<any>;
  delete(input): Promise<any>;
  getAllDeletedRecords(input): Promise<any>;
  getRecycleBinRecords(input): Promise<any>;
  getPermanentlyDeletedRecords(input): Promise<any>;
  search(input): Promise<any>;
}

export function modules(): IModules {
  return {
    get: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          input.module + '/{id}',
          HTTP_METHODS.GET,
          false
        )
      ); //No I18N
    },
    post: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          input.module + '/{id}',
          HTTP_METHODS.POST,
          false
        )
      ); //No I18N
    },
    put: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          input.module + '/{id}',
          HTTP_METHODS.PUT,
          false
        )
      ); //No I18N
    },
    delete: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          input.module + '/{id}',
          HTTP_METHODS.DELETE,
          false
        )
      ); //No I18N
    },
    getAllDeletedRecords: function(input): Promise<any> {
      if (input.params) {
        input.params.type = 'all';
      } else {
        input.params = {
          type: 'all', //No I18N
        };
      }

      return promiseResponse(
        constructRequestDetails(
          input,
          input.module + '/deleted',
          HTTP_METHODS.GET,
          false
        )
      ); //No I18N
    },
    getRecycleBinRecords: function(input): Promise<any> {
      if (input.params) {
        input.type = 'recycle';
      } else {
        input.params = {
          type: 'recycle', //No I18N
        };
      }

      return promiseResponse(
        constructRequestDetails(
          input,
          input.module + '/deleted',
          HTTP_METHODS.GET,
          false
        )
      ); //No I18N
    },
    getPermanentlyDeletedRecords: function(input): Promise<any> {
      if (input.params) {
        input.type = 'permanent';
      } else {
        input.params = {
          type: 'permanent', //No I18N
        };
      }

      return promiseResponse(
        constructRequestDetails(
          input,
          input.module + '/deleted',
          HTTP_METHODS.GET,
          false
        )
      ); //No I18N
    },
    search: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          input.module + '/search',
          HTTP_METHODS.GET,
          false
        )
      ); //No I18N
    },
  };
}
