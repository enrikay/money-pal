
export interface UserSignInDto {
    readonly username: string;
    readonly password: string;
}

export interface UserSignUpDto {
    readonly firstName: string;
    readonly surName: string;
    readonly username: string;
    readonly password: string;
}
