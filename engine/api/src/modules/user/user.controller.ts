import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    NotAcceptableException,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res,
} from '@nestjs/common';
import {UserService} from './user.service';
import {ApiUseTags} from '@nestjs/swagger';
import {UserRessource} from '../../ressources/UserRessource';
import {
    CreateUserValidator,
    UserEditValidator,
} from '../../validations/UserValidator';
import {TaskService} from '../task/task.service';

@ApiUseTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly tasks: TaskService,
    ) {
    }

    @Get()
    async index(@Res() res) {
        const users = await this.userService.index();
        return res.send({
            data: UserRessource.collection(users),
        });
    }

    @Get(':username')
    async show(@Param('username') username: string, @Res() res) {
        const user = await this.userService.findUsername(username, [
            'profile',
            'profile.programingLanguage',
        ]);
        if (!user) {
            return this.notFound(res);
        }
        return res.send({
            data: UserRessource.toArray(user),
        });
    }

    @Post()
    async create(@Body() body: CreateUserValidator, @Res() res) {
        const user = await this.userService.register(body);
        return res.send({
            data: UserRessource.toArray(user),
        });
    }

    @Put(':username')
    async update(
        @Param('username') username: string,
        @Body() body: UserEditValidator,
        @Res() res,
    ) {
        let user = await this.userService.findUsername(username);
        if (!user) {
            return this.notFound(res);
        }
        user = await this.userService.update(user, body);
        return res.send({
            data: UserRessource.toArray(user),
        });
    }

    @Delete(':username')
    async delete(@Param('username') username: string, @Res() res) {
        const user = await this.userService.findUsername(username);
        if (!user) {
            return this.notFound(res);
        }
        await this.userService.delete(user);
        return res.send({
            message: 'User deleted',
        });
    }

    private notFound(res) {
        return res.status(500).send(this.userService.notFound());
    }
}
