
export interface UserSignInDto {
    readonly email: string;
    readonly password: string;
}

export interface UserSignUpDto extends UserSignInDto {
    readonly firstName: string;
    readonly surName: string;
}
