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
export interface IOAuth {
    constructurl(action: string): string;
    generateTokens(url: string): Promise<any>;
}
export declare function OAuth(configuration: IRefreshAccessToken | IGenerateToken, action: 'generate_token' | 'refresh_access_token'): IOAuth;
