
import type { User } from "../../types/app";
import { useEffect, useState } from "react"
import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination"
import { Skeleton } from "../../components/ui/skeleton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Filter } from "../../components/FIlter";
export function PanelUsuario({
  goDetail,
}: {
  goDetail: (userId: number) => void;
}){
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [nameFilter, setNameFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const pageSize = 5;
    const filteredUsers = usuarios.filter((user) =>
        user.name.toLocaleLowerCase().includes(nameFilter.trim().toLocaleLowerCase()),
    );
    const pageCount = Math.ceil(filteredUsers.length / pageSize);
    const pageUsers = filteredUsers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );
    const firstUser = filteredUsers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const lastUser = Math.min(currentPage * pageSize, filteredUsers.length);

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
        <div className="flex w-full flex-col gap-6 px-4 py-5 sm:px-8 lg:px-10">
            <div className="flex w-full max-w-6xl items-end justify-between gap-4 self-center">
                <Filter
                    value={nameFilter}
                    onValueChange={(value) => {
                        setNameFilter(value);
                        setCurrentPage(1);
                    }}
                />
            </div>
            <section className="w-full max-w-6xl self-center">
                <div className="overflow-hidden rounded-lg border">
                    <Table className="min-w-[1650px] table-fixed">
                        <TableCaption>Lista de usuarios.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[60px]">Id</TableHead>
                                <TableHead className="w-[180px]">Nombre</TableHead>
                                <TableHead className="w-[140px]">Nombre de usuario</TableHead>
                                <TableHead className="w-[220px]">Correo electrónico</TableHead>
                                <TableHead className="w-[320px]">Dirección y geolocalización</TableHead>
                                <TableHead className="w-[150px]">Teléfono</TableHead>
                                <TableHead className="w-[160px]">Sitio web</TableHead>
                                <TableHead className="w-[300px]">Empresa</TableHead>
                                <TableHead className="w-[60px]"><span className="sr-only">Acciones</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody aria-busy={isLoading}>
                            {isLoading && Array.from({ length: 5 }, (_, index) => (
                                <TableRow key={`skeleton-${index}`} aria-hidden="true">
                                    <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-4/5" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-4/5" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-4/5" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-4/5" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                    <TableCell><Skeleton className="ml-auto h-8 w-8" /></TableCell>
                                </TableRow>
                            ))}
                            {!isLoading && loadError && (
                                <TableRow>
                                    <TableCell colSpan={9} className="py-8 text-center text-destructive">
                                        {loadError}
                                    </TableCell>
                                </TableRow>
                            )}
                            {!isLoading && !loadError && filteredUsers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={9} className="py-8 text-center text-muted-foreground">
                                        No se encontraron usuarios con ese nombre.
                                    </TableCell>
                                </TableRow>
                            )}
                            {!isLoading && !loadError && pageUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="align-top font-medium">{user.id}</TableCell>
                                    <TableCell className="whitespace-normal break-words align-top">{user.name}</TableCell>
                                    <TableCell className="whitespace-normal break-words align-top">{user.username}</TableCell>
                                    <TableCell className="whitespace-normal break-all align-top">{user.email}</TableCell>
                                    <TableCell className="whitespace-normal break-words align-top">
                                        <dl className="space-y-1 ">
                                            <div>
                                                <dt className="inline font-medium">Calle: </dt>
                                                <dd className="inline">{user.address.street}</dd>
                                            </div>
                                            <div>
                                                <dt className="inline font-medium">Suite: </dt>
                                                <dd className="inline">{user.address.suite}</dd>
                                            </div>
                                            <div>
                                                <dt className="inline font-medium">Ciudad: </dt>
                                                <dd className="inline">{user.address.city}</dd>
                                            </div>
                                            <div>
                                                <dt className="inline font-medium">Código postal: </dt>
                                                <dd className="inline">{user.address.zipcode}</dd>
                                            </div>
                                            <div>
                                                <dt className="inline font-medium">Latitud: </dt>
                                                <dd className="inline">{user.address.geo.lat}</dd>
                                            </div>
                                            <div>
                                                <dt className="inline font-medium">Longitud: </dt>
                                                <dd className="inline">{user.address.geo.lng}</dd>
                                            </div>
                                        </dl>
                                    </TableCell>
                                    <TableCell className="whitespace-normal break-words align-top">{user.phone}</TableCell>
                                    <TableCell className="whitespace-normal break-all align-top">{user.website}</TableCell>
                                    <TableCell className="whitespace-normal break-words align-top">
                                        <dl className="space-y-1">
                                            <div><dt className="inline font-medium">Nombre: </dt><dd className="inline">{user.company.name}</dd></div>
                                            <div><dt className="inline font-medium">Frase: </dt><dd className="inline">{user.company.catchPhrase}</dd></div>
                                            <div><dt className="inline font-medium">Actividad: </dt><dd className="inline">{user.company.bs}</dd></div>
                                        </dl>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8"><MoreHorizontalIcon /><span className="sr-only">Abrir menu</span></Button>} />
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => goDetail(user.id)}>Ver</DropdownMenuItem>
                                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem variant="destructive">
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={8}>Total</TableCell>
                                <TableCell className="text-right">
                                    {isLoading ? <Skeleton className="ml-auto h-4 w-8" /> : filteredUsers.length}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                </Table>
                </div>
                <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
                    <p className="text-sm text-muted-foreground">
                        Mostrando {firstUser}-{lastUser} de {filteredUsers.length} usuarios
                    </p>
                    <Pagination className="mx-0 w-auto justify-end">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    size='default'
                                    text="Anterior"
                                    aria-label="Ir a la página anterior"
                                    aria-disabled={currentPage === 1}
                                    tabIndex={currentPage === 1 ? -1 : undefined}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setCurrentPage((page) => Math.max(1, page - 1));
                                    }}
                                />
                            </PaginationItem>
                            {Array.from({ length: pageCount }, (_, index) => {
                                const page = index + 1;
                                return (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href="#"
                                            size='default'
                                            isActive={currentPage === page}
                                            aria-label={`Ir a la pagina ${page}`}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setCurrentPage(page);
                                            }}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    text="Siguiente"
                                    size='default'
                                    aria-label="Ir a la página siguiente"
                                    aria-disabled={currentPage === pageCount || pageCount === 0}
                                    tabIndex={currentPage === pageCount || pageCount === 0 ? -1 : undefined}
                                    className={currentPage === pageCount || pageCount === 0 ? "pointer-events-none opacity-50" : undefined}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setCurrentPage((page) => Math.min(pageCount, page + 1));
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </section>
        </div>
    )
}