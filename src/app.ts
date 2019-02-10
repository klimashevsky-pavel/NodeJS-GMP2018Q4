import * as express from 'express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import runWatchers from 'utils/runWatcher';
import { addRoutes } from 'utils/addRoutes';
import { queryParser } from 'middlewares/queryParser';

// http servers
import 'http-servers/plain-text-server';
import 'http-servers/html-server';
import 'http-servers/json-server';
import 'http-servers/echo-server';

// run file watchers from previous tasks
runWatchers();

// Made Server singleton mostly for learning purposes
class Server {
    public static getInstance(): Server {
        if (!this.instance) {
            this.instance = new Server();
        }
        return this.instance;
    }

    private static instance: Server | undefined;

    public app: express.Application;

    private constructor() {
        this.app = express();
        this.configureServer();
    }

    private configureServer(): void {
        this.app.use(queryParser);
        this.app.use(bodyParser.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: true
            })
        );
        this.app.use(cookieParser());
        this.configureRoutes();
        this.app.use(errorHandler());
    }

    private configureRoutes(): void {
        const router: express.Router = express.Router();
        addRoutes(router);

        this.app.use(router);
    }
}

const { app } = Server.getInstance();

export default app;
