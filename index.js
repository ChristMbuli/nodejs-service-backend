const express = require("express");
const cors = require("cors");
const productRouter = require("./routes/productRoute");

const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    httpOnly: false,
    credentials: true,
  })
);
app.use(express.json());

// Enregistrement des routes
app.use("/products", productRouter);

// Gestion des erreurs non interceptées
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Démarrage du serveur
const port = 4040;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
