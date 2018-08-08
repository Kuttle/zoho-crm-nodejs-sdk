export interface IActions {
    convert(input: any): Promise<any>;
}
export declare function actions(): IActions;
