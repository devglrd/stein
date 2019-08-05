import {Controller, Get, Logger, Req, Res, UnauthorizedException} from '@nestjs/common';
import {getConnection} from "typeorm";
import {Request, Response} from "express";
import {ConfigService} from "./modules/config/config.service";

@Controller()
export class AppController {
    constructor(private configService: ConfigService, private logger: Logger) {
    }

    @Get()
    apiInfo(@Res() res) {
        return res.send({
            message: 'Hello to stein api',
        });
    }

    @Get('migrate')
    async runMigration(@Res() res: Response, @Req() req: Request) {
        const {token} = req.query;
        if (token !== this.configService.get('DB_TOKEN')) {
            throw new UnauthorizedException('Wrong Token combination!');
        }
        const migration = await getConnection().runMigrations();
        this.logger.debug('Successfuly completed migration...');
        return res.send({
            message: 'Migration done'
        })
    }


    @Get('sync')
    async runSynchronize(@Res() res: Response, @Req() req: Request) {
        const {token} = req.query;
        if (token !== this.configService.get('DB_TOKEN')) {
            throw new UnauthorizedException('Wrong Token combination!');
        }
        const sync = await getConnection().synchronize();
        this.logger.debug('Successfuly completed synchronize...');
        return res.send({
            message: 'Migration done'
        })
    }
}
