import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('lookup')
export class LookupController {

    @Get('find')
    findAll(@Req() request: Request): string {
      return 'This action returns all lookup controller';
    }

    @Post()
    create(): string {
      return 'This action adds a new cat';
    }

}
