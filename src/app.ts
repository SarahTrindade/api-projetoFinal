import express from "express";

import animalRoutes from "./routes/animalRoutes";
import consultaRoutes from "./routes/consultaRoutes";
import donoRoutes from "./routes/donoRoutes";
import veterinarioRoutes from "./routes/veterinarioRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    sucesso: true,
    mensagem: "API Clínica Veterinária funcionando!"
  });
}); 

app.use("/api/animais", animalRoutes);
app.use("/api/consultas", consultaRoutes);
app.use("/api/donos", donoRoutes);
app.use("/api/veterinarios", veterinarioRoutes);

export default app;

