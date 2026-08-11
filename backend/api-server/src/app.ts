import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

import path from "node:path";
import fs from "node:fs";

const staticPath = path.resolve(process.cwd(), "frontend/app/dist/public");
const altStaticPath = path.resolve(process.cwd(), "frontend/app/dist");

const finalStaticPath = fs.existsSync(staticPath)
  ? staticPath
  : fs.existsSync(altStaticPath)
    ? altStaticPath
    : null;

if (finalStaticPath) {
  app.use(express.static(finalStaticPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(finalStaticPath, "index.html"));
  });
}

export default app;
