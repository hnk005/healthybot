import process from "process";
import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session, { SessionOptions } from "express-session";
import router from "./routers";
import errorMiddleware from "./middlewares/error.middleware";
import requestLogger from "./middlewares/logger.middleware";
import { logger } from "./utils/logger";
import { mongodb, redis } from "./config/connectDB";

class App {
  public readonly corsOptions: CorsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  public readonly sesstionOptions: SessionOptions = {
    secret: process.env.SECTION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  };

  public readonly limitRequest: string = "500kb";
  public readonly port: string = process.env.PORT ?? "5000";

  private express: Express = express();
  private mongodb = mongodb;
  private redis = redis;

  async run() {
    try {
      // Middleware
      this.express.use(cors(this.corsOptions));
      this.express.use(bodyParser.json());
      this.express.use(requestLogger);
      this.express.use(cookieParser());
      this.express.use(express.json({ limit: this.limitRequest }));
      this.express.use(
        express.urlencoded({ limit: this.limitRequest, extended: true }),
      );
      this.express.use(session(this.sesstionOptions));

      // Router
      this.express.use("/api", router);

      // Error handling middleware
      this.express.use(errorMiddleware);

      // Database Connection
      await this.mongodb.connect(process.env.MONGODB_URI);

      await this.redis.connect();

      //Listen server
      this.express.listen(this.port, (err) => {
        if (err) {
          logger.error("Lỗi máy chủ cục bộ", err);
          return;
        }
        logger.info(`Server đang chạy tại http://localhost:${this.port}`);
      });
    } catch (error) {
      return error;
    }
  }
}

const app = new App();

app.run().catch((err) => logger.error(err));
