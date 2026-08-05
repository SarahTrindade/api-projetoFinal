import request from "supertest";
import app from "../app";

describe("Teste das rotas", () => {
  it("deve responder na rota de animais", async () => {
    const response = await request(app).get("/api/animais");

    expect(response.status).toBe(200);
  });
});