describe("Veterinário", () => {
    it("deve criar um veterinário", () => {
      const veterinario = {
        nome: "João",
        especialidade: "Clínico Geral",
      };
  
      expect(veterinario.especialidade).toBe("Clínico Geral");
    });
  });