import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';

const indexPath = join(__dirname, '..', 'public', 'index.html');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() res) {
    res.sendFile(indexPath);
  }
}
