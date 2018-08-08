export interface IGetAuthTokenResult {
  accesstoken: string;
  expirytime: number;
  refreshtoken: string;
}

export const HTTP_METHODS = {
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  GET: 'GET',
};

export interface ITokenObj {
  access_token: string;
  expiry_time?: number;
  refresh_token: string;
  user_identifier: string;
}

export interface IStorage {
  saveOAuthTokens: (token_obj: ITokenObj) => Promise<void>;
  updateOAuthTokens: (token_obj: Partial<ITokenObj>) => Promise<void>;
  getOAuthTokens(user_identifier: string): Promise<IGetAuthTokenResult[]>;
}
