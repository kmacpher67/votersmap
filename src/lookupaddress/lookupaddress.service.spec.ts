import { Test, TestingModule } from '@nestjs/testing';
import { LookupaddressService } from './lookupaddress.service';

describe('LookupaddressService', () => {
  let service: LookupaddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LookupaddressService],
    }).compile();

    service = module.get<LookupaddressService>(LookupaddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
