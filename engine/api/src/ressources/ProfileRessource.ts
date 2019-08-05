import { Injectable } from '@nestjs/common';
import { Profile } from '../entity/profile.entity';
import { ProgramingLanguageRessource } from './PrograminLanguageRessource';

@Injectable()
export class ProfileRessource {
  static toArray(profile: Profile) {
    return {
      id: profile.id,
      tjm: profile.tjm,
      programing_language: profile.programingLanguage
        ? ProgramingLanguageRessource.toArray(profile.programingLanguage)
        : {},
    };
  }
}
