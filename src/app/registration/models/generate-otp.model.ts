export class GenerateOtp {
    id?: number;
    mobile: string = "";
    otp?: number;
    messageId?: string;
    status?: string;
    createdDate?: Date;
}
export interface GenerateOtpInterface {
    id?: number;
    mobile: string;
    otp?: number;
    messageId?: string;
    status?: string;
    createdDate?: Date;
}