import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewScoreComponent } from './add-new-score.component';

describe('AddNewScoreComponent', () => {
  let component: AddNewScoreComponent;
  let fixture: ComponentFixture<AddNewScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
