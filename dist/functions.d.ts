export interface IFunctions {
    executeFunctionsInGet(input: any): Promise<any>;
    executeFunctionsInPost(input: any): Promise<any>;
}
export declare function functions(): IFunctions;
