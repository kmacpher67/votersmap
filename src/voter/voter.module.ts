import { Module } from '@nestjs/common';
import { VoterService } from './voter.service';

@Module({
  providers: [VoterService]
})
export class VoterModule {}
