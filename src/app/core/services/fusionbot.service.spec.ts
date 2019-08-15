import { TestBed, inject } from '@angular/core/testing';

import { FusionbotService } from './fusionbot.service';

describe('FusionbotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FusionbotService]
    });
  });

  it('should be created', inject([FusionbotService], (service: FusionbotService) => {
    expect(service).toBeTruthy();
  }));
});
