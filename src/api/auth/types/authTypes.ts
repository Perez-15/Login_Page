export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    // _id: string;
    id: string;
    username: string;
    email: string;
    firstname: string;
    image: string;
}