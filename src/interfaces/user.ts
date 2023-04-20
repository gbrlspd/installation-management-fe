export interface IUserProps {
  company: {
    name: string;
  };
  id: string;
  username: string;
  email: string;
  company_prefix: string;
  created_at?: string;
  updated_at?: string;
}

export interface INewUser {
  company_prefix: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserUpdate {
  company_prefix?: string;
  username?: string;
  email?: string;
  password?: string;
}
