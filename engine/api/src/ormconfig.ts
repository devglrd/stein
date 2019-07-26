import {ConnectionOptions} from 'typeorm';

require('dotenv').config();

const config: ConnectionOptions = {
    insecureAuth: true,
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
        "src/entity/**/*.ts",
        "build/entity/**/*.ts",
    ],
    migrations: [
        "src/migration/**/*.ts",
        "build/migration/**/*.ts"
    ],
    subscribers: [
        "src/subscriber/**/*.ts",
        "build/subscriber/**/*.ts"
    ],
    cli: {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
};


export = config;
