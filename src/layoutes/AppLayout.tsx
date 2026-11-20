import {TopBar} from "./topbar/topbar";
import type { AppLayoutProps } from "../types/app";

export function AppLayout({children, page, setPage}: AppLayoutProps) {
    return (
       
    <div className="flex flex-col w-full justify-end ">
        <TopBar page={page} setPage={setPage} />
        <div className="content">{children}</div>
    </div>
    )
}