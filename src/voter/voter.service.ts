import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Voter, VoterDocument } from './schemas/voter.schema';

@Injectable()
export class VoterService {
    constructor(@InjectModel(Voter.name) private voterModel: Model<VoterDocument>) {}

    getHello(): string {
      var mainPage = '<html><body> <a href="warren7ward"> warren7ward</a> <br> <a href="warrenvoters"> warrenvoters</a> </body></html>';

      return mainPage;
    }
  
    async findAll(): Promise<Voter[]> {
      const lookupId = "600adb4cad4ca1e0eeeb9524";
      return this.voterModel.find({"CITY":"WARREN CITY", "WARD":"WARREN-WARD 7"}).exec();
    }
  
    async findOne(): Promise<Voter[]> {
      const lookupId = "600adb4cad4ca1e0eeeb9524";
      return this.voterModel.find({ "_id": lookupId }).exec();
    }
}
