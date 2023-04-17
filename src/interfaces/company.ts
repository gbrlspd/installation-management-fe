export interface ICompanyProps {
  prefix: string;
  name: string;
  country: string;

  crm_url?: string;
  opb_url?: string;
  validator_code?: string;
  validator_qty?: number;
  owner_name?: string;
  owner_email?: string;
  created_at?: string;
  updated_at?: string;
}
