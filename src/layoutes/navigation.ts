import type { IconName, Page } from "../types/app";

export type NavigationItem = {
  id: Page;
  label: string;
  icon: IconName;
  count?: number;
};

export const navigation: NavigationItem[] = [
  { id: "dashboard", label: "Vista general", icon: "users" },
  { id: "detail", label: "Detalle Usuario", icon: "user" },
];