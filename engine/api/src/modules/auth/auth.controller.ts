import {
  Body,
  Controller,
  Get,
  Logger,
  NotAcceptableException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthRessource } from '../../ressources/AuthRessource';
import { AuthGuard } from '@nestjs/passport';
import { UserRessource } from '../../ressources/UserRessource';
import { MailerService } from '@nest-modules/mailer';
import { KueService } from 'nestjs-kue';
import { TaskService } from '../task/task.service';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    private readonly tasks: TaskService,
    private logger: Logger,
  ) {}

  @Post('register')
  async register(@Res() res, @Body() body) {
    const user = await this.userService.register(body);

    const token = await this.authService.login(user);

    const job = await this.tasks
      .createJob(this.tasks.sendMail, {
        user,
        sender: user.email,
        mail_title: 'A new account created',
      })
      .delay(TaskService.delay)
      .save();

    job.on('complete', result => {
      Logger.log('Log from job : ' + result);
    });

    const result = { user, token };
    return res.send({
      data: AuthRessource.toArray(result),
    });
  }

  @Post('login')
  async login(@Res() res, @Body() body) {
    if (!body.email || !body.password) {
      throw new NotAcceptableException('Wrong Payload');
    }
    const user = await this.userService.findEmail(body.email);
    if (!user) {
      throw new NotAcceptableException('No user found for email ' + body.email);
    }
    const token = await this.authService.login(user);

    return res.send({
      data: AuthRessource.toArray({ user, token }),
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('user')
  async getCurrentUser(@Req() request, @Res() res) {
    res.send({
      data: UserRessource.toArray(request.user),
    });
  }
}
