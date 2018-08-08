export interface IOrg {
    get(input: any): Promise<any>;
}
export declare function org(): IOrg;
