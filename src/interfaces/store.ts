export interface IStore {
  company: {
    name: string;
  };
  id: string;
  name: string;
  city: string;
  status: string;
  updated_at: string;

  installed_by?: string;
  installed_at?: string;
  migrated_by?: string;
  migrated_at?: string;
  router_model?: string;
  router_user?: string;
  router_password?: string;
  server01_model?: string;
  server02_model?: string;
  esxi01_ip?: string;
  esxi01_version?: string;
  esxi01_user?: string;
  esxi01_password?: string;
  esxi02_ip?: string;
  esxi02_version?: string;
  esxi02_user?: string;
  esxi02_password?: string;
  nas_model?: string;
  nas_user?: string;
  nas_password?: string;
  os?: string;
  os_user?: string;
  os_password?: string;
  pos_qty?: number;
  mpos_qty?: number;
  kiosk_model?: string;
  kiosk_qty?: number;
  rms_qty?: number;
  controllers_model?: string;
  controllers_qty?: number;
  created_at?: string;
}
