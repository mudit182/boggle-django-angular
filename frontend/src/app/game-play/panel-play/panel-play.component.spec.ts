import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPlayComponent } from './panel-play.component';

describe('PanelPlayComponent', () => {
  let component: PanelPlayComponent;
  let fixture: ComponentFixture<PanelPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
