export interface RegisterAdminInterface {
  name?: string;
  email: string;
  username: string;
  password: string;
}

export interface LoginAdminInterface {
  username: string;
  password: string;
}
