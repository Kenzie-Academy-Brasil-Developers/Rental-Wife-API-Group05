export interface IRequestUpdateUser {
    name?: string;
    email?: string;
    password?: string;
    avatar_img?: string;
    gender?: string;
}

export interface IResponseUpdateUser {
    id: string;
    name: string;
    email: string;
    avatar_img: string;
    gender: string;
    is_hired: boolean;
}

export interface IRequestUpdateAddress {
    street?: string;
    zipCode?: string;
    number?: string;
    city?: string;
    state?: string;
}

export interface IResponseUpdateAddress {
    id: string;
    street: string;
    zipCode: string;
    number: string;
    city: string;
    state: string;
}
