require('dotenv').config();


module.exports = [{
    name: process.env.ORMCONFIG_NAME,
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNANE,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    insecureAuth: true,
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
}];
