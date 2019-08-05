import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { ProfileRessource } from './ProfileRessource';
import { ProgramingLanguageRessource } from './PrograminLanguageRessource';

@Injectable()
export class UserRessource {
  static toArray(user: User) {
    return {
      id: user.id,
      username: user.username,
      description: user.content,
      email: user.email,
      dev: user.isDev,
      profile: !!user.profile ? ProfileRessource.toArray(user.profile) : {},
    };
  }

  static collection(users: User[]) {
    return users.map((user: User) => {
      return {
        id: user.id,
        username: user.username,
        description: user.content,
        email: user.email,
        dev: user.isDev,
        profile: !!user.profile ? ProfileRessource.toArray(user.profile) : {},
      };
    });
  }
}
