import { Injectable, Get, Res, Req } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Voter, VoterDocument } from './voter/schemas/voter.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(Voter.name) private voterModel: Model<VoterDocument>) {}

  @Get()
  root(@Res() res) {
    res.render('index');
  }

  getHello(): string {
    var mainPage = '<html><body> <a href="warren7ward"> warren7ward</a> <br> <a href="warrenvoters"> warrenvoters</a> </body></html>';

    return mainPage;
  }
   
  async findVoter(voter): Promise<Voter[]> {
    
    if (null == voter) {
      // {"CITY":"WARREN CITY", "WARD":"WARREN-WARD 7"}
      voter={};
    }
    return this.voterModel.find(voter).exec();
  }

  async findWard(ward): Promise<Voter[]> {
    if (null == ward) {
      // {"CITY":"WARREN CITY", "WARD":"WARREN-WARD 7"}
      ward = {ward:"WARREN-WARD 7"};
    }
    return this.voterModel.find(ward).exec();
  }

  //getListOfwards(params)
  async getListOfwards(ward): Promise<Voter[]> {
      // db.getCollection('voters').distinct('WARD')
    return this.voterModel.distinct('WARD').exec();
  }

  async findAll(): Promise<Voter[]> {
    return this.voterModel.find({"CITY":"WARREN CITY"}).exec();
  }

  async findOne(voter): Promise<Voter[]> {
    if (null == voter) {
      // {"CITY":"WARREN CITY", "WARD":"WARREN-WARD 7"}
      //{ "_id": lookupId }
      voter={};
    }
    return this.voterModel.find(voter).exec();
  }
}
