import { useEffect, useState, type FormEvent } from "react";
import type { User } from "../../types/app";
import { Button } from "../../components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Field, FieldLabel } from "../../components/ui/field";
import { Skeleton } from "../../components/ui/skeleton";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export function DetalleUsuario({ userId, goBack }: { userId: number, goBack: () => void; }) {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [arePostsLoading, setArePostsLoading] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser(): Promise<void> {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(`No se pudo cargar el usuario (${response.status}).`);
        }
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setUserError(
            error instanceof Error ? error.message : "No se pudo cargar el usuario.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsUserLoading(false);
        }
      }
    }

    async function loadPosts(): Promise<void> {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(`No se pudieron cargar las publicaciones (${response.status}).`);
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setPostsError(
            error instanceof Error
              ? error.message
              : "No se pudieron cargar las publicaciones.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setArePostsLoading(false);
        }
      }
    }

    void loadUser();
    void loadPosts();
    return () => controller.abort();
  }, [userId]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle || !trimmedBody) {
      setFormError("El título y el texto son obligatorios.");
      return;
    }

    const newPost: Post = {
      userId,
      id: Date.now(),
      title: trimmedTitle,
      body: trimmedBody,
    };
    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setTitle("");
    setBody("");
    setFormError(null);
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-8">  
    <ArrowBigLeft onClick={goBack}/>
    <h1 className="text-2xl font-semibold">Detalle de usuario</h1>
      
      {isUserLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader><Skeleton className="h-6 w-40" /></CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><Skeleton className="h-6 w-40" /></CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        </div>
      ) : userError ? (
        <Card role="alert">
          <CardContent className="py-5 text-destructive">{userError}</CardContent>
        </Card>
      ) : user ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>Información de contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><span className="font-medium">Usuario:</span> {user.username}</p>
              <p><span className="font-medium">Correo:</span> {user.email}</p>
              <p><span className="font-medium">Teléfono:</span> {user.phone}</p>
              <p><span className="font-medium">Sitio web:</span> {user.website}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Dirección y empresa</CardTitle>
              <CardDescription>{user.company.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>{user.address.street}, {user.address.suite}</p>
              <p>{user.address.city}, {user.address.zipcode}</p>
              <p><span className="font-medium">Coordenadas:</span> {user.address.geo.lat}, {user.address.geo.lng}</p>
              <p><span className="font-medium">Frase:</span> {user.company.catchPhrase}</p>
              <p><span className="font-medium">Actividad:</span> {user.company.bs}</p>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {visible && (
        <Card>
          <CardHeader>
            <CardTitle>Nueva publicación</CardTitle>
            <CardDescription>La publicación se agregará a esta lista localmente.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
              <Field>
                <FieldLabel htmlFor="post-title">Título</FieldLabel>
                <input
                  id="post-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                  aria-invalid={formError !== null && !title.trim()}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="post-body">Texto</FieldLabel>
                <textarea
                  id="post-body"
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  required
                  rows={4}
                  aria-invalid={formError !== null && !body.trim()}
                  className="min-h-24 resize-y rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </Field>
              {formError && <p role="alert" className="text-sm text-destructive">{formError}</p>}
              <div>
                <Button type="submit">Publicar</Button>
              </div>
            </form>
          </CardContent>
          </Card>
        )}

      <section className="flex flex-col gap-4" aria-labelledby="posts-heading">
        <div className="flex items-center justify-between gap-4">
          <h2 id="posts-heading" className="text-xl font-semibold">Publicaciones </h2>
          <Button onClick={() => setVisible(!visible)}>{visible ? "Cerrar Formulario" : "Agregar publicación"} </Button>
        </div>
        {arePostsLoading ? (
          Array.from({ length: 3 }, (_, index) => (
            <Card key={`post-skeleton-${index}`} aria-hidden="true">
              <CardHeader><Skeleton className="h-5 w-2/3" /></CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </CardContent>
            </Card>
          ))
        ) : null}
        {!arePostsLoading && postsError && (
          <Card role="alert">
            <CardContent className="py-5 text-destructive">{postsError}</CardContent>
          </Card>
        )}
        {!arePostsLoading && !postsError && posts.length === 0 && (
          <p className="text-sm text-muted-foreground">Este usuario aún no tiene publicaciones.</p>
        )}
        {!arePostsLoading && posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{post.body}</p>
              </CardContent>
            </Card>
        ))}
      </section>
    </main>
  );
}
