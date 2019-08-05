import {
    Logger,
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConfigModule} from './modules/config/config.module';
import {TypeOrmModule, TypeOrmModuleAsyncOptions} from '@nestjs/typeorm';
import {ConfigService} from './modules/config/config.service';
import {SeedsModule} from './modules/seeds/seeds.module';
import {UserModule} from './modules/user/user.module';
import {AuthModule} from './modules/auth/auth.module';
import {SteinMiddleware} from './middleware/stein.middleware';
import {HandlebarsAdapter, MailerModule} from '@nest-modules/mailer';
import {TaskModule} from './modules/task/task.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    name: 'default',
                    type: configService.get('DB_TYPE'),
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [__dirname + '/**/**.entity{.ts,.js}'],
                    synchronize: configService.get('DB_SYNC'),
                    cache: {
                        type: configService.get('DB_CACHE_DRIVER'),
                        options: {
                            host: configService.get('DB_CACHE_HOST'),
                            port: configService.get('DB_CACHE_PORT')
                        }
                    }
                } as TypeOrmModuleAsyncOptions;
            },
        }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    transport: `${configService.get('MAIL_DRIVER')}://${configService.get(
                        'MAIL_USERNAME',
                    )}:${configService.get('MAIL_PASSWORD')}@${configService.get(
                        'MAIL_HOST',
                    )}:${configService.get('MAIL_PORT')}`,
                    defaults: {
                        from: '"nest-modules" <modules@nestjs.com>',
                    },
                    template: {
                        dir: __dirname + './../mails',
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                };
            },
        }),
        ConfigModule,
        SeedsModule,
        UserModule,
        AuthModule,
        TaskModule,
    ],
    controllers: [AppController],
    providers: [SteinMiddleware, Logger],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SteinMiddleware)
            .forRoutes({path: '*', method: RequestMethod.ALL});
    }
}
