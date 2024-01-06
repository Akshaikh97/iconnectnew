// export class Login {
//     id?: number;
//     name: string = '';
//     email: string = '';
//     mobile: string = '';
//     pan: string = '';
//     password: string = '';
//     loginStatus?: boolean;
//     createdDate?: Date;
//     remark?: string;
//     approvedBy?: number;
//     approvedDate?: Date;
//     rejectedBy?: number;
//     rejectedDate?: Date;
//     modifyDate?: Date;
// }
// export interface LoginInterface {
//     id?: number;
//     name: string;
//     email: string;
//     mobile: string;
//     pan: string;
//     password: string;
//     loginStatus?: boolean;
//     createdDate?: Date;
//     remark?: string;
//     approvedBy?: number;
//     approvedDate?: Date;
//     rejectedBy?: number;
//     rejectedDate?: Date;
//     modifyDate?: Date;
// }
export interface Login {
    id?: number;
    name: string;
    email: string;
    mobile: string;
    pan: string;
    password: string;
    confirmPassword: string;
    captcha: string;
}