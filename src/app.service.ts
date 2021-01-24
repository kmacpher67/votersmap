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
    const lookupId = "600adb4cad4ca1e0eeeb9524";
    if (null == voter) {
      // {"CITY":"WARREN CITY", "WARD":"WARREN-WARD 7"}
      voter = new Voter();
      voter.city = "WARREN CITY";
      voter.ward = "WARREN-WARD 7";
    }
    return this.voterModel.find(voter).exec();
  }

  async findWard(voter): Promise<Voter[]> {
    if (null == voter) {
      // {"CITY":"WARREN CITY", "WARD":"WARREN-WARD 7"}
      voter = new Voter();
      voter.city = "WARREN CITY";
      voter.ward = "WARREN-WARD 7";
    }
    return this.voterModel.find(voter).exec();
  }

  async findAll(): Promise<Voter[]> {
    const lookupId = "600adb4cad4ca1e0eeeb9524";
    return this.voterModel.find({"CITY":"WARREN CITY"}).exec();
  }

  async findOne(): Promise<Voter[]> {
    const lookupId = "600adb4cad4ca1e0eeeb9524";
    return this.voterModel.find({ "_id": lookupId }).exec();
  }
}
