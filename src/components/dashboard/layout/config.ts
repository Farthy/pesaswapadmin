import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'integrations', title: 'Module Analysis', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  { key: 'account', title: 'Payment Method', href: paths.dashboard.account, icon: 'user' },
  
] satisfies NavItemConfig[];
