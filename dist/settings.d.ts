export interface ISettings {
    getFields(input: any): Promise<any>;
    getLayouts(input: any): Promise<any>;
    getCustomViews(input: any): Promise<any>;
    updateCustomViews(input: any): Promise<any>;
    getModules(input: any): Promise<any>;
    getRoles(input: any): Promise<any>;
    getProfiles(input: any): Promise<any>;
    getRelatedLists(input: any): Promise<any>;
}
export declare function settings(): ISettings;
