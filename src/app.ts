import express from "express";
import path from "path";
import session from "express-session";
import animalRoutes from "./routes/animalRoutes";
import consultaRoutes from "./routes/consultaRoutes";
import donoRoutes from "./routes/donoRoutes";
import veterinarioRoutes from "./routes/veterinarioRoutes"

const app = express();

app.use(express.json());
app.use(
    session({
      secret: "petcare-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
      },
    })
  );
app.use(express.static(path.join(__dirname, "../public")));


app.use("/api/animais", animalRoutes);
app.use("/api/consultas", consultaRoutes);
app.use("/api/donos", donoRoutes);
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/veterinarios", veterinarioRoutes);


app.get("/teste", (req, res) => {
    req.session.usuario = {
      id: 1,
      nome: "Sarah",
      email: "sarah@email.com",
    };
  
    res.json({
      mensagem: "Sessão criada!",
      usuario: req.session.usuario,
    });
  });
  
  export default app;