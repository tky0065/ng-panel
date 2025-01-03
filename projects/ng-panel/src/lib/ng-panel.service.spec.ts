import { TestBed } from '@angular/core/testing';

import { NgPanelService } from './ng-panel.service';

describe('NgPanelService', () => {
  let service: NgPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
