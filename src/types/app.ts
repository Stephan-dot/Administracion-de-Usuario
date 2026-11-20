import type { ReactNode } from "react";
export type Page =
  | "dashboard"
  | "detail"
export type IconName =
  | "users"
  | "user";

  export type LayoutProps = {
    page: Page;
    setPage : (page: Page)=> void;
}

export type AppLayoutProps ={
    children: ReactNode,
    page: Page,
    setPage: (page:Page)=>void
}