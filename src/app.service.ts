import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'em Hiep giau node cua toi dau roi';
  }
}
