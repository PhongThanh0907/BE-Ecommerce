export interface UserType {
    userName: string;
    email: string;
    password: string;
    isAdmin: boolean;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
  }

  export interface UserReturnType {
    _id: string;
    userName: string;
    email: string;
    isAdmin: boolean;
    token: string;
  }