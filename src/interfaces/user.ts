export interface IUser {
  company: {
    name: string;
  };
  id: string;
  username: string;
  email: string;
  updated_at: string;

  created_at?: string;
}
