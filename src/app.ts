import express, { Application } from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";




export default function createServer(PORT?: number) {

  const app: Application = express()

  const port = PORT || config.get("port") as number;
  const host = config.get("host") as string;

  app.use(deserializeUser);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.listen(port, () => {
    log.info(`Server listing at http://${host}:${port}`);

    connect();

    app.use("/api/v1/", routes)
    
    app.get("/", (req, res) => res.send("<b>Oh yea, you hit the right spot! <a href='https://documenter.getpostman.com/view/7357326/UUy38ky2'>Documentation URL</a>:).</b>"))
  });


  return app;
}
createServer()