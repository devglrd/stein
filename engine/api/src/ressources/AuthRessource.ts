import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRessource } from './UserRessource';

@Injectable()
export class AuthRessource {
  static toArray(results: { user: User; token: { access_token: string } }) {
    return {
      user: UserRessource.toArray(results.user),
      token: results.token.access_token,
    };
  }
}
