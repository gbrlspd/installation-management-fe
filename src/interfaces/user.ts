export interface IUserProps {
  company: {
    name: string;
  };
  id: string;
  username: string;
  email: string;

  created_at?: string;
  updated_at?: string;
}
