import {ConnectionOptions} from 'typeorm';

require('dotenv').config();

const config: ConnectionOptions = {
    name: process.env.ORMCONFIG_NAME,
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNANE,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    migrationsRun: true,
    logging: false,
    entities: [
        __dirname + "/entity/*{.js,.ts}",
    ],
    migrations: [
        __dirname + "/migration/*{.js,.ts}",
    ],
    subscribers: [
        __dirname + "/subscriber/*{.js,.ts}",

    ],
    cli: {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
};


export = config;
