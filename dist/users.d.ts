export interface IUsers {
    get(input: any): Promise<any>;
}
export declare function users(): IUsers;
