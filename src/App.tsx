import { PanelUsuario } from "./modules/usuarios/PanelUsuarios";
import { AppLayout } from "./layoutes/AppLayout";
import { useMemo, useState } from "react";
import { DetalleUsuario } from "./modules/usuarios/DetalleUsuario";
import type { Page } from "./types/app";
export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [selectedUserId, setSelectedUserId] = useState<number>(1);
  const content = useMemo(()=>{
    if (page === "dashboard")
      return (
        <PanelUsuario
          goDetail={(userId) => {
            setSelectedUserId(userId);
            setPage("detail");
          }}
        />
      );
    if(page == 'detail')
      return(
        <DetalleUsuario userId={selectedUserId} goBack={() => setPage("dashboard")} />
      );
  },[page, selectedUserId])
  return (
    <AppLayout 
    page={page}
    setPage={setPage}>
      {content}
    </AppLayout>
  );
}