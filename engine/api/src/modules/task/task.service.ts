import {Injectable, Logger} from '@nestjs/common';
import {Job, JobCallback, DoneCallback} from 'kue';
import {KueService, Task} from 'nestjs-kue';
import {MailerService} from '@nest-modules/mailer';

@Injectable()
export class TaskService {
    public static delay = 10000;

    constructor(
        private mailerService: MailerService,
        private readonly kueService: KueService,
    ) {
    }

    createJob(job, data) {
        Logger.debug('Saving job...');
        return this.kueService.createJob(job, data);
    }

    @Task({
        name: 'sendMail',
        concurrency: 3,
        attempts: 1000,
        ttl: 3000,
    })
    sendMail(job: Job, done: DoneCallback) {
        this.mailerService
            .sendMail({
                to: job.data.sender,
                from: 'glrd@stein.fr',
                subject: job.data.mail_title,
                template: 'register',
                context: {
                    user: job.data.user,
                },
            })
            .then(() => {
                done(null, 'Mail Sent ! ');
            })
            .catch(err => {
                Logger.error('Error in queue', err)
            });
    }
}
