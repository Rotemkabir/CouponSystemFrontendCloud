export interface LoginModel {
    email: string;
    password: string;
    clientType: string;
}

export interface Credentials {
    email: string;
    password: string;
    clientType: string;
}

export interface User {
    token: string;
    email: string;
    id: number;
    clientType: string;
}