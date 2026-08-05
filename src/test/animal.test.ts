describe("Animal", () => {
    it("deve criar um animal", () => {
      const animal = {
        nome: "Rex",
        especie: "Cachorro",
        idade: 3,
        peso: 12,
      };
  
      expect(animal.nome).toBe("Rex");
      expect(animal.idade).toBe(3);
    });
  });