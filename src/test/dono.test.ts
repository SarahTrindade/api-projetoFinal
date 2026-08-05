describe("Dono", () => {
    it("deve criar um dono", () => {
      const dono = {
        nome: "Maria",
        telefone: "99999-9999",
      };
  
      expect(dono.nome).toBe("Maria");
    });
  });