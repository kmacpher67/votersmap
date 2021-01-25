import { Injectable, Get, Res, Req, Controller, ParseUUIDPipe } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Voter, VoterDocument } from './voter/schemas/voter.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(Voter.name) private voterModel: Model<VoterDocument>) {}

  addGeomtryCheck(jsonSearch) {
    // geometry: { $exists: true }
    if (null != jsonSearch) {
      jsonSearch.geometry = { $exists: true }
    }
    return jsonSearch;
  }

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

  voterSummaryProjection = {"LAST_NAME":1, "DATE_OF_BIRTH":1, "RESIDENTIAL_ADDRESS1":1, "PARTY_AFFILIATION":1, "totalVotes":1, "demVotes":1, "repVotes":1, "geometry.$":1 };

  async findWard(voterQuery): Promise<Voter[]> {
    console.log('findWard(ward)=' + JSON.stringify(voterQuery, null, 3));
    if (null == voterQuery) {
      // {"CITY":"WARREN CITY", "WARD":"WARREN-WARD 7"}
      // "PRECINCT_NAME": "WARREN CITY 5K"
      voterQuery = {WARD:"WARREN-WARD 5"};
      // , "totalVotes": { $gte: 0 }
    }
    voterQuery = this.addGeomtryCheck(voterQuery);
    voterQuery = this.parseTotalVotes(voterQuery);

    return this.voterModel.find(voterQuery).select(this.voterSummaryProjection).exec();
  }

  //getListOfwards(params)
  async getListOfWards(ward): Promise<Voter[]> {
      // db.getCollection('voters').distinct('WARD')
      if (null == ward || !ward.CITY) {
        // {"CITY":"WARREN CITY", "WARD":"WARREN-WARD 7"}
        // "PRECINCT_NAME": "WARREN CITY 5K"
        ward = {CITY:"WARREN CITY"};
      }
      console.log('getListOfWards = distinct ward =' + JSON.stringify(ward, null,3));
    return this.voterModel.distinct('WARD',ward).exec();
  }

  async getListOfPrincints(ward) {
    // {"WARD":"WARREN-WARD 5"}
    console.log('findWard(ward)=' + JSON.stringify(ward, null, 3));
    if (null == ward || !ward.WARD) {
      // {"CITY":"WARREN CITY", "WARD":"WARREN-WARD 7"}
      // "PRECINCT_NAME": "WARREN CITY 5K"
      // ward = {WARD:"WARREN-WARD 5"};
      ward = {CITY:"WARREN CITY"};
    }
    console.log('getListOfWards = distinct ward =' + JSON.stringify(ward, null,3));
    return this.voterModel.distinct('PRECINCT_NAME', ward).exec();
  }

  async findAll(): Promise<Voter[]> {
    return this.voterModel.find({"CITY":"WARREN CITY"}).exec();
  }

  async findOne(voter): Promise<Voter[]> {
    if (null == voter) {
      // {"CITY":"WARREN CITY", "WARD":"WARREN-WARD 7"}
      //{ "_id": lookupId }
      //{ $gte: 20 }
      voter={};
    }
    return this.voterModel.find(voter).exec();
  }

  parseTotalVotes(voterQuery) {
    console.log('parseTotalVotes(voterQuery)=' + voterQuery);
      // { $gte: 20 }
      if (null == voterQuery) {
        // {"CITY":"WARREN CITY", "WARD":"WARREN-WARD 7"}
        voterQuery = {voterQuery:"WARREN-WARD 7", "totalVotes": { $gte: 0 } }; 
      }
      if (null == voterQuery.totalVotes ) {
        voterQuery.totalVotes.$gte=0;
      } else {
        console.log('parseTotalVotes(voterQuery) - voterQuery.totalVotes=' + voterQuery.totalVotes);
        if (voterQuery.totalVotes.$gte) {
          voterQuery.totalVotes.$gte = 20;

        } else {
          var totalVoterLimit = voterQuery.totalVotes;
          voterQuery.totalVotes = {$gte:20};
          console.log('parsing totalVoterLimit=' + totalVoterLimit + ' totalVotes' + JSON.stringify(voterQuery.totalVotes));
          try {
            voterQuery.totalVotes.$gte = parseInt(totalVoterLimit) || 1;
          } catch(error) {

          }
        }
        
      }

    return voterQuery;
  }
}
