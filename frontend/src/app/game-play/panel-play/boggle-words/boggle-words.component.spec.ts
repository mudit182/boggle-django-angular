import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoggleWordsComponent } from './boggle-words.component';

describe('BoggleWordsComponent', () => {
  let component: BoggleWordsComponent;
  let fixture: ComponentFixture<BoggleWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoggleWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoggleWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
