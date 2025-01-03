import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPanelComponent } from './ng-panel.component';

describe('NgPanelComponent', () => {
  let component: NgPanelComponent;
  let fixture: ComponentFixture<NgPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
