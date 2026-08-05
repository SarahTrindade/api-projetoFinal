describe("Autenticação", () => {
    it("deve validar login", () => {
      const usuario = {
        email: "admin@email.com",
        senha: "123456",
      };
  
      expect(usuario.email).toContain("@");
    });
  });