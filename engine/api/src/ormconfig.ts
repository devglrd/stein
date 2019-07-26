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
    logging: false,
    entities: [
        process.env.BUILD_FOLDER + "/entity/**/*.ts"
    ],
    migrations: [
        process.env.BUILD_FOLDER + "/migration/**/*.ts"
    ],
    subscribers: [
        process.env.BUILD_FOLDER + "/subscriber/**/*.ts"
    ],
    cli: {
        "entitiesDir": process.env.BUILD_FOLDER + "/entity",
        "migrationsDir": process.env.BUILD_FOLDER + "/migration",
        "subscribersDir": process.env.BUILD_FOLDER + "/subscriber"
    }
};


export = config;
