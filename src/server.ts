import express from "express";
import cors from "cors";
import routes from "./routes";
import { env } from "./config/env";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api", routes);

app.listen(env.port, () => {
  console.log(`General server running on: http://localhost:${env.port}`);
});
