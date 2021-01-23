import { Controller, Get, Header, Param, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { VoterService } from './voter/voter.service';
import { Request } from 'express';
import {Voter} from './voter/schemas/voter.schema'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
      root(@Res() res) {
        console.log('rendering AppController res=' + res);
        res.render('index');
      }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('warrenvoters')
  async getWarrenVoters(): Promise<Voter[]> {
    return this.appService.findAll();
  }

  @Get('warren7ward/:user')
  async getWarren7Ward(@Param() params): Promise<Voter[]> {
    console.log(params);
    
    return this.appService.findWard(null);
  }

  @Get('warrenvoter')
  async getWarrenVoter(): Promise<Voter[]> {
    return this.appService.findOne();
  }

  @Get('findall')
  findAll(@Req() request: Request): string {
    return 'This action returns all cats in main app controller findAll findall method';
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Get()
  async findAny(): Promise<any[]> {
    return [];
  }

  @Post()
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This action adds a new cat';
  }
  

}
