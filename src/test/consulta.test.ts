describe("Consulta", () => {
    it("deve criar uma consulta", () => {
      const consulta = {
        data: "05/08/2026",
        hora: "14:00",
        status: "Agendada",
      };
  
      expect(consulta.status).toBe("Agendada");
    });
  });