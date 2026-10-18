import express from "express";
import cafeteriaRoutes from "./routes/cafeteriaRoutes.js";

const app = express();

app.use(express.json());

app.use("/", cafeteriaRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;