import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmstextModule } from './smstext/smstext.module';
import { LookupController } from './lookup/lookup.controller';
import { LookupaddressService } from './lookupaddress/lookupaddress.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SosDbService } from './sos-db/sos-db.service';
import { ConfigModule } from '@nestjs/config';
import { Voter, VoterSchema } from './voter/schemas/voter.schema';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { Users } from './users';
import { UsersController } from './users/users.controller';



// https://docs.nestjs.com/techniques/configuration
// https://stackoverflow.com/questions/63285055/nestjs-how-to-use-env-variables-in-main-app-module-file-for-database-connecti/63285574
// Read down in the 2nd one about npm install env-cmd export env files to process...
// ConfigModule.forRoot({
//   envFilePath: '.development.env',
// });
const mongoDBUrl = process.env.MONGODB_URI
@Module({
  imports: [SmstextModule, 
    MongooseModule.forRoot(mongoDBUrl, {
      connectionName: 'voters',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      }),
    MongooseModule.forFeature([{ name: Voter.name, schema: VoterSchema }], 'voters'),
    UsersModule,
    ],
  controllers: [AppController, LookupController, UsersController],
  providers: [AppService, LookupaddressService, SosDbService, UsersService, Users],
})
export class AppModule {}
