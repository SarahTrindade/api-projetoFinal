import express from "express";
import path from "path";
import animalRoutes from "./routes/animalRoutes";
import consultaRoutes from "./routes/consultaRoutes";
import donoRoutes from "./routes/donoRoutes";
import veterinarioRoutes from "./routes/veterinarioRoutes"

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));


app.use("/api/animais", animalRoutes);
app.use("/api/consultas", consultaRoutes);
app.use("/api/donos", donoRoutes);
app.use("/api/veterinarios", veterinarioRoutes);

export default app;