import { TestBed, inject } from '@angular/core/testing';

import { DisplaySettingsService } from './display-settings.service';

describe('DisplayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisplaySettingsService]
    });
  });

  it('should be created', inject([DisplaySettingsService], (service: DisplaySettingsService) => {
    expect(service).toBeTruthy();
  }));
});
