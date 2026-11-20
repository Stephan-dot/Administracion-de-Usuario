export function DetalleUsuario({
  goBack,
}: {
  goBack: () => void;
}) {
  return (
    <div className="panel-usuario">
      <h1>Detalle de Usuario</h1>
      <button onClick={goBack}>volver</button>
    </div>
  );
}