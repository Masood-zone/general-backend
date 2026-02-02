import express from "express";
import cors from "cors";
import routes from "./routes";
import { sessionMiddleware } from "./middleware/session.middleware";
import { env } from "./config/env";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(sessionMiddleware);

app.use(routes);

app.listen(env.port, () => {
  console.log(`General server running on: http://localhost:${env.port}`);
});
