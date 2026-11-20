import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { User } from "../types/app";
import { PanelUsuario } from "../modules/usuarios/PanelUsuarios";

function createUser(id: number): User {
  return {
    id,
    name: `Usuario ${id}`,
    username: `usuario${id}`,
    email: `usuario${id}@example.com`,
    address: {
      street: "Calle de prueba",
      suite: "Suite 1",
      city: "Ciudad",
      zipcode: "00000",
      geo: { lat: "0", lng: "0" },
    },
    phone: "000-000-0000",
    website: "example.com",
    company: {
      name: "Empresa",
      catchPhrase: "Frase",
      bs: "Actividad",
    },
  };
}

describe("PanelUsuario paginacion", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("navigates between pages and shows only the users on the current page", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(Array.from({ length: 10 }, (_, index) => createUser(index + 1))), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    render(<PanelUsuario goDetail={vi.fn()} />);

    expect(await screen.findByText("Usuario 1")).toBeTruthy();
    expect(screen.getByText("Usuario 5")).toBeTruthy();
    expect(screen.queryByText("Usuario 6")).toBeNull();
    expect(screen.getByText("Mostrando 1-5 de 10 usuarios")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Ir a la página siguiente" }));

    expect(await screen.findByText("Usuario 6")).toBeTruthy();
    expect(screen.getByText("Usuario 10")).toBeTruthy();
    expect(screen.queryByText("Usuario 5")).toBeNull();
    expect(screen.getByText("Mostrando 6-10 de 10 usuarios")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Ir a la página anterior" }));

    expect(await screen.findByText("Usuario 1")).toBeTruthy();
    expect(screen.queryByText("Usuario 6")).toBeNull();
  });
});
