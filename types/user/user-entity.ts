export interface LoginUserEntity {
    email: string;
    password: string;
}

export interface UserEntity extends LoginUserEntity {
    id?: string;
    userName: string | null;
}