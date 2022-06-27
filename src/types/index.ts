export interface User {
    name: string,
    email: string,
    dob: string
}

export interface GetUserResponse {
    message: string;
    data?: User;
}

export interface DeleteUserResponse {
    message: string;
}