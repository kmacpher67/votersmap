import { Test, TestingModule } from '@nestjs/testing';
import { SosDbService } from './sos-db.service';

describe('SosDbService', () => {
  let service: SosDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SosDbService],
    }).compile();

    service = module.get<SosDbService>(SosDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
