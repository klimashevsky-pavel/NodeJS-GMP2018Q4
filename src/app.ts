import * as express from 'express';
import * as bodyParser from 'body-parser';
import session from 'express-session';
import errorHandler from 'errorhandler';
import passport, { PassportStatic } from 'passport';
import runWatchers from 'utils/runWatcher';
import { addRoutes } from 'utils/addRoutes';
import { queryParser } from 'middlewares/queryParser';
import { cookieParser } from 'middlewares/cookieParser';
import { setupPassport } from 'utils/setupPassport';

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
        this.app.use(cookieParser);
        this.app.use(bodyParser.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: true
            })
        );
        this.app.use(
            session({
                secret: 'keyboard cat',
                resave: false,
                saveUninitialized: false
            })
        );
        setupPassport(passport);
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.configureRoutes(passport);
        this.app.use(errorHandler());
    }

    private configureRoutes(passportModule: PassportStatic): void {
        const router: express.Router = express.Router();
        addRoutes(router, passportModule);

        this.app.use(router);
    }
}

const { app } = Server.getInstance();

export default app;
