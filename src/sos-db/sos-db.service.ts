import { Injectable } from '@nestjs/common';
import { Voter } from '../voter/interfaces/voter.interface'

@Injectable()
export class SosDbService {
    private readonly voters: Voter[] = [];

    create(voter: Voter) {
      this.voters.push(voter);
    }
  
    findAll(): Voter[] {
      return this.voters;
    }
}
