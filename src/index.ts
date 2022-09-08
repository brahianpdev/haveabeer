// External modules
import cookieParser from "cookie-parser";
import session from "express-session";
import compression from 'compression';
import mongoose from "mongoose";
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

// Internal modules
import routes from './config/routes';
import enviromentConfig from './config/enviroment.config';

mongoose.connect(enviromentConfig.mongo.url).then(() => {
    const app = express();
    const sessionConfig = { secret: "SECRET", resave: false, saveUninitialized: true, cookie: { secure: true } };

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(compression({ level: 9 }));
    app.use(session(sessionConfig));
    app.use(morgan("tiny"));
    app.use(cookieParser());
    app.use(express.json());
    app.use(helmet());
    app.use(cors());

    app.use("/", routes);

    app.listen(enviromentConfig.app.port, () => {
        /* Using template literals to print the port number. */
        console.log(`🔥 Server is running at port ${enviromentConfig.app.port}`);
    });

    console.log("Connected to MongoDB");

}).catch((error) => console.log(error));
