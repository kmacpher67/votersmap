import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VoterDocument = Voter & Document;

@Schema()
export class Voter {

  @Prop()
  id: string; 

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  County_Number: number;

  @Prop()
  County_Id: number;

  @Prop()
  SOS_VoterId: number;

  @Prop()
  last_name: string;

  @Prop()
  FirstName: string;

  @Prop()
  DateOfBirth: string;

  @Prop()
  RegistrationDate: string;

  @Prop()
  VoterStatus: string;

  @Prop()
  PartyAffiliation: string;

  @Prop()
  residentialAddress_1: string;

  @Prop()
  ResidentialAddress2: string;

  @Prop()
  residential_city: string;

  @Prop()
  residential_zip: string;

  @Prop()
  ward: string;

  @Prop()
  city: string;

}

export const VoterSchema = SchemaFactory.createForClass(Voter);
