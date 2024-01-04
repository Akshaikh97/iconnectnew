export class KycDoc {
    kycId?: number;
    regId?: number;
    pan: string = "";
    docPathPan?: string;
    docPanType?: string;
    docPan?: any; // Replace 'any' with the appropriate type for your file upload
    docPathPhoto?: string;
    docPhotoType?: string;
    docPhoto?: any; // Replace 'any' with the appropriate type for your file upload
    docPathSign?: string;
    docSignType?: string;
    docSign?: any; // Replace 'any' with the appropriate type for your file upload
    uploadDate?: Date;
    modifyDate?: Date;
}
export interface KycDoc {
    kycId?: number;
    regId?: number;
    pan: string;
    docPathPan?: string;
    docPanType?: string;
    docPan?: any; // Replace 'any' with the appropriate type for your file upload
    docPathPhoto?: string;
    docPhotoType?: string;
    docPhoto?: any; // Replace 'any' with the appropriate type for your file upload
    docPathSign?: string;
    docSignType?: string;
    docSign?: any; // Replace 'any' with the appropriate type for your file upload
    uploadDate?: Date;
    modifyDate?: Date;
}