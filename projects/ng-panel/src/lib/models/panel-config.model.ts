export interface PanelConfig {
  title: string;
  logo?: string;
  theme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  menu: MenuItem[];
  profileConfig?: ProfileConfig;
}

export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
  badge?: string;
  type?: 'divider';
}

export interface ModelConfig {
  name: string;
  fields: FieldConfig[];
  actions?: ActionConfig[];
  list?: ListConfig;
  form?: FormConfig;
}

export interface FieldConfig {
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'email' | 'password' | 'textarea' | 'multiselect' | 'group' | 'file' | 'datetime-local' | 'time';
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: any }[];
  validators?: any[];
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  dependsOn?: string;
  fields?: FieldConfig[]; // For group type
}

export interface ActionConfig {
  name: string;
  label: string;
  icon?: string;
  type: 'primary' | 'secondary' | 'danger';
  handler?: (item: any) => void;
  condition?: (item: any) => boolean;
  confirmMessage?: string;
}

export interface ListConfig {
  columns?: string[];
  pageSize?: number;
  filters?: FieldConfig[];
  sortable?: boolean;
}

export interface FormConfig {
  layout?: 'horizontal' | 'vertical';
  submitLabel?: string;
  cancelLabel?: string;
}

export interface ThemeConfig {
  name: string;
  label: string;
  icon?: string;
}

export interface ProfileConfig {
  avatar?: string;
  username?: string;
  actions: ProfileAction[];
}

export interface ProfileAction {
  label: string;
  icon?: string;
  action?: () => void;
  route?: string;
}


