import express from "express";
import userRoutes from "./routes/users.js";
import cors from "cors";
import { sequelize } from "./models/index.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);


// Sincronizar o banco de dados antes de iniciar o servidor.
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(8800, () => {
      console.log("Server is running on port 8800");
    });
  })
  .catch(error => console.error("Failed to sync database:", error));
