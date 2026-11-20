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

type Company ={
  name: string,
  catchPhrase: string,
  bs: string
}
type Geo ={
  lat: string,
  lng: string
}

type Adress ={
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: Geo
}

export type User = {
   id: number,
  name: string,
  username: string,
  email: string,
  address: Adress,
  phone: string,
  website: string,
  company: Company
}