export function PanelUsuario({
  goDetail,
}: {
  goDetail: (userId: number) => void;
}) {
  return (
    <div className="panel-usuario">
      <h1>Panel de Usuario</h1>
      <button onClick={() => goDetail(1)}>Ir a Detalle Usuario</button>
    </div>
  );
}