import { useState, useEffect } from "react";
import type { User } from "../../types/app";
export function PanelUsuario({
  goDetail,
}: {
  goDetail: (userId: number) => void;
}) {
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    useEffect(() => {
        async function obtenerUsuarios(): Promise<void> {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error(`Error al cargar usuarios: ${response.status}`);
                }
                const data: User[] = await response.json();
                setUsuarios(data);
            } catch (error) {
                setLoadError(
                    error instanceof Error ? error.message : "No se pudieron cargar los usuarios.",
                );
            } finally {
                setIsLoading(false);
            }
        }

        obtenerUsuarios();
    }, []);
    return (
        <div className="panel-usuario">
        <h1>Panel de Usuario</h1>
        <button onClick={() => goDetail(1)}>Ir a Detalle Usuario</button>
        {usuarios.map((usuario) => (
            <div key={usuario.id}>
                <p>{usuario.name}</p>
            </div>
        ))}
        </div>
    );
}