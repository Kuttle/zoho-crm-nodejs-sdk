import { promiseResponse, constructRequestDetails } from './util';
import { HTTP_METHODS } from './commonInterfaces';

export interface ISettings {
  getFields(input): Promise<any>;
  getLayouts(input): Promise<any>;
  getCustomViews(input): Promise<any>;
  updateCustomViews(input): Promise<any>;
  getModules(input): Promise<any>;
  getRoles(input): Promise<any>;
  getProfiles(input): Promise<any>;
  getRelatedLists(input): Promise<any>;
}

export function settings(): ISettings {
  return {
    getFields: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          'settings/fields/{id}',
          HTTP_METHODS.GET,
          true
        )
      ); //No I18N
    },
    getLayouts: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          'settings/layouts/{id}',
          HTTP_METHODS.GET,
          true
        )
      ); //No I18N
    },
    getCustomViews: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          'settings/custom_views/{id}',
          HTTP_METHODS.GET,
          true
        )
      ); //No I18N
    },
    updateCustomViews: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          'settings/custom_views/{id}',
          HTTP_METHODS.PUT,
          true
        )
      ); //No I18N
    },
    getModules: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          'settings/modules' +
            (input && input.module ? '/' + input.module : ''),
          HTTP_METHODS.GET,
          false
        )
      ); //No I18N
    },
    getRoles: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          'settings/roles/{id}',
          HTTP_METHODS.GET,
          true
        )
      ); //No I18N
    },
    getProfiles: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          'settings/profiles/{id}',
          HTTP_METHODS.GET,
          true
        )
      ); //No I18N
    },
    getRelatedLists: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          'settings/related_lists/{id}',
          HTTP_METHODS.GET,
          true
        )
      ); //No I18N
    },
  };
}
