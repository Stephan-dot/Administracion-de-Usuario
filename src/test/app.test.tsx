import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DetalleUsuario } from "../modules/usuarios/DetalleUsuario";
import "@testing-library/jest-dom/vitest";
const user = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "leanne@example.com",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: { lat: "-37.3159", lng: "81.1496" },
  },
  phone: "1-770-736-8031",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};

const posts = [
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere",
    body: "Texto de la publicación existente",
  },
];

function jsonResponse(data: unknown): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function mockSuccessfulRequests(): void {
  vi.stubGlobal(
    "fetch",
    vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      return Promise.resolve(
        jsonResponse(url.includes("/posts?") ? posts : user),
      );
    }),
  );
}

describe("UserDatil", () => {
  beforeEach(() => {
    mockSuccessfulRequests();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("muestra la información completa del usuario", async () => {
    render(<DetalleUsuario userId={1} goBack={vi.fn()}/>);

    expect(await screen.findByText("Leanne Graham")).toBeTruthy();
    expect(await screen.findByText("sunt aut facere")).toBeTruthy();
    expect(screen.getByText("leanne@example.com")).toBeTruthy();
    expect(screen.getByText("Kulas Light, Apt. 556")).toBeTruthy();
    expect(screen.getByText("Romaguera-Crona")).toBeTruthy();
  });

  it("carga y muestra las publicaciones del usuario", async () => {
    render(<DetalleUsuario userId={1} goBack={vi.fn()}/>);

    expect(await screen.findByText("sunt aut facere")).toBeTruthy();
    expect(await screen.findByText("Leanne Graham")).toBeTruthy();
    expect(screen.getByText("Texto de la publicación existente")).toBeTruthy();
    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts?userId=1",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it("no agrega una publicación si el título o el texto están vacíos", async () => {
    render(<DetalleUsuario userId={1} goBack={vi.fn()} />);
    await screen.findByText("sunt aut facere");
    await screen.findByText("Leanne Graham");
    fireEvent.click(screen.getByRole("button", { name: "Agregar publicación" }));

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "  " },
    });
    fireEvent.change(screen.getByLabelText("Texto"), {
      target: { value: "Contenido válido" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Publicar" }));

    const postsSection = screen.getByRole("region", { name: "Publicaciones" });
    expect(screen.getByRole("alert").textContent).toContain(
      "El título y el texto son obligatorios.",
    );
    expect(within(postsSection).queryByText("Contenido válido")).toBeNull();
  });

  it("agrega la publicación validada a la lista local", async () => {
    render(<DetalleUsuario userId={1} goBack={vi.fn()}/>);
    await screen.findByText("sunt aut facere");
    await screen.findByText("Leanne Graham");
    fireEvent.click(screen.getByRole("button", { name: "Agregar publicación" }));

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "  Nueva publicación  " },
    });
    fireEvent.change(screen.getByLabelText("Texto"), {
      target: { value: "  Contenido nuevo  " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Publicar" }));

    const postsSection = screen.getByRole("region", { name: "Publicaciones" });
    expect(await within(postsSection).findByText("Nueva publicación")).toBeTruthy();
    expect(within(postsSection).getByText("Contenido nuevo")).toBeTruthy();
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
