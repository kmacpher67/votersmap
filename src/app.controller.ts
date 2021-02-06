import { Controller, Get, Header, Param, Post, Req, Res, UseGuards  } from '@nestjs/common';
import { AppService } from './app.service';
import { VoterService } from './voter/voter.service';
import { Request } from 'express';
import {Voter} from './voter/schemas/voter.schema'
import { waitForDebugger } from 'inspector';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Req() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/logout')
  async logout(@Req() req) {
    return req.user;
  }

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

    // db.getCollection('voters').distinct('WARD')
    @Get('cities')
    async getListofCities(@Param() params): Promise<Voter[]> {
      return this.appService.getListOfWards(params);
    }

  // db.getCollection('voters').distinct('WARD')
  @Get('wards')
  async getListOfWards(@Param() params): Promise<Voter[]> {
    return this.appService.getListOfWards(params);
  }

  // db.getCollection('voters').distinct('WARD')
  @Get('precincts')
  async getListOfPrincints(@Param() params): Promise<Voter[]> {
    return this.appService.getListOfPrincints(params);
  }

  @Get('getward/:WARD')
  async getWard(@Param() params): Promise<Voter[]> {
    console.log(params);
    
    return this.appService.findWard(params);
  }

  @Get('getprecinct/:PRECINCT_NAME')
  async getPrecinct(@Param() params): Promise<Voter[]> {
    console.log(params);
    
    return this.appService.findWard(params);
  }
  
  @Get('getprecinctByScore/:PRECINCT_NAME/:totalVotes')
  async getprecinctByScore(@Param() params): Promise<Voter[]> {
    console.log(params);
    
    return this.appService.findWard(params);
  }

  @Get('warrenvoter/:voter')
  async getWarrenVoter(@Param() params): Promise<Voter[]> {
    console.log('async getWarrenVoter(@Param() params)' + JSON.stringify(params,null,3));
    return this.appService.findVoter(params);
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
