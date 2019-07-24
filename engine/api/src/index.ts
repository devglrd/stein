import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import helmet = require("helmet");
import routes from "./routes";

createConnection().then(async connection => {
    const port = 3000;
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use("/", routes);


    // start express server
    app.listen(port, () => {
        console.log(`Express server has started on port ${port}. Open http://localhost:${port}/users to see results`);
    });


}).catch(error => console.log(error));
