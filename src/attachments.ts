import { promiseResponse, constructRequestDetails } from './util';
import { HTTP_METHODS } from './commonInterfaces';

export interface IAttachments {
  uploadFile(input): Promise<any>;
  deleteFile(input): Promise<any>;
  downloadFile(input): Promise<any>;
  uploadLink(input): Promise<any>;
  uploadPhoto(input): Promise<any>;
  downloadPhoto(input): Promise<any>;
  deletePhoto(input): Promise<any>;
}

export function attachments(): IAttachments {
  return {
    uploadFile: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          input.module + '/{id}/Attachments',
          HTTP_METHODS.POST,
          false
        )
      ); //No I18N
    },
    deleteFile: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          input.module + '/{id}/Attachments/' + input.relatedId,
          HTTP_METHODS.DELETE,
          false
        )
      ); //No I18N
    },
    downloadFile: function(input): Promise<any> {
      input.download_file = true;
      return promiseResponse(
        constructRequestDetails(
          input,
          input.module + '/{id}/Attachments/' + input.relatedId,
          HTTP_METHODS.GET,
          false
        )
      ); //No I18N
    },
    uploadLink: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          input.module + '/{id}/Attachments',
          HTTP_METHODS.POST,
          false
        )
      ); //No I18N
    },
    uploadPhoto: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          input.module + '/{id}/photo',
          HTTP_METHODS.POST,
          false
        )
      ); //No I18N
    },
    downloadPhoto: function(input): Promise<any> {
      input.download_file = true;
      return promiseResponse(
        constructRequestDetails(
          input,
          input.module + '/{id}/photo',
          HTTP_METHODS.GET,
          false
        )
      ); //No I18N
    },
    deletePhoto: function(input): Promise<any> {
      return promiseResponse(
        constructRequestDetails(
          input,
          input.module + '/{id}/photo',
          HTTP_METHODS.DELETE,
          false
        )
      ); //No I18N
    },
  };
}
