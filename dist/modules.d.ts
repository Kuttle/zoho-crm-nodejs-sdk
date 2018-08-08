export interface IModules {
    get(input: any): Promise<any>;
    post(input: any): Promise<any>;
    put(input: any): Promise<any>;
    delete(input: any): Promise<any>;
    getAllDeletedRecords(input: any): Promise<any>;
    getRecycleBinRecords(input: any): Promise<any>;
    getPermanentlyDeletedRecords(input: any): Promise<any>;
    search(input: any): Promise<any>;
}
export declare function modules(): IModules;
