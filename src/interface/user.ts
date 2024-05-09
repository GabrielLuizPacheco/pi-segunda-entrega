export interface IUser {
  name: string;
  email: string;
  CPF: string;
  birthday: string;
  gender: number;
  phone?: string;
}

export interface IChangePassword {
  currentPassword?: string;
  rePassword: string;
  password: string;
}

export interface IRegisterUser extends IUser, IChangePassword {}
