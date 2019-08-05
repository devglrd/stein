import { Injectable, Logger } from '@nestjs/common';
import { Connection, getConnection, QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { Profile } from '../../entity/profile.entity';
import { ProgramingLanguage } from '../../entity/programing-language.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class SeedsService {
  private queryRuner: QueryRunner;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(ProgramingLanguage)
    private readonly programingRepository: Repository<ProgramingLanguage>,
    private readonly logger: Logger,
  ) {
    this.queryRuner = getConnection().createQueryRunner();
  }

  async seed() {
    this.logger.debug('Run seeds');
    await this.truncate();

    const languages = await this.seedsLanguage();
    this.logger.debug('Successfuly completed seeding programing language...');

    const users = await this.seedUser();
    this.logger.debug('Successfuly completed seeding users...');
  }

  async seedUser() {
    const users = [];
    for (let i = 1; i < 50; i++) {
      const user = new User();
      user.email = `user-${i}@gmail.com`;
      user.username = 'username' + i;
      user.content = this.lorem();
      user.password = 'password';
      const profile = new Profile();
      profile.tjm = Math.floor(Math.random() * 1000);
      const progrm = await ProgramingLanguage.findOne({
        where: { id: Math.floor(Math.random() * 9) + 1 },
      });
      profile.programingLanguage = progrm;
      await profile.save();
      user.profile = profile;
      await user.save();
      users.push(user);
    }
    const user = new User();
    user.email = `glrd.remi@gmail.com`;
    user.username = 'glrd';
    user.content = 'Hi Im glrd';
    user.password = 'password';
    const profile = new Profile();
    profile.tjm = Math.floor(Math.random() * 1000);
    const progrm = await ProgramingLanguage.findOne({
      where: { id: Math.floor(Math.random() * 9) + 1 },
    });
    profile.programingLanguage = progrm;
    await profile.save();
    user.profile = profile;
    await user.save();
    users.push(user);
    return users;
  }

  async seedsLanguage() {
    const lags = [];
    for (let i = 1; i < 10; i++) {
      const language = new ProgramingLanguage();
      language.name = 'node js ' + i;
      language.slug = 'node-js-' + i;
      language.content = this.lorem();
      await language.save();
      lags.push(language);
    }
  }

  private lorem(): string {
    return 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l\'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n\'a pas fait que survivre cinq siècles, mais s\'est aussi adapté à la bureautique informatique, sans que son contenu n\'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker';
  }

  async truncate() {
    this.logger.debug('Clear all tables ...');
    const queryRunnr = getConnection().createQueryRunner();
    // queryRunnr.query('SET FOREIGN_KEY_CHECKS=0;');
    await getConnection().synchronize(true);
  }
}
