export interface BreadcrumbItem {
  label: string;
  path?: string;
  isLast?: boolean;
}

export interface BreadcrumbConfig {
  productName?: string;
  customCrumbs?: BreadcrumbItem[];
}