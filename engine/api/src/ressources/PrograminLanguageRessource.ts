import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRessource } from './UserRessource';
import { Profile } from '../entity/profile.entity';
import { ProgramingLanguage } from '../entity/programing-language.entity';

@Injectable()
export class ProgramingLanguageRessource {
  static toArray(language: ProgramingLanguage) {
    return {
      id: language.id,
      name: language.name,
      description: language.content,
      main_file: language.file,
      files: language.files,
      tjm_average: language.getAverageTjm(),
    };
  }
}
