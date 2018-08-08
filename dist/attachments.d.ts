export interface IAttachments {
    uploadFile(input: any): Promise<any>;
    deleteFile(input: any): Promise<any>;
    downloadFile(input: any): Promise<any>;
    uploadLink(input: any): Promise<any>;
    uploadPhoto(input: any): Promise<any>;
    downloadPhoto(input: any): Promise<any>;
    deletePhoto(input: any): Promise<any>;
}
export declare function attachments(): IAttachments;
