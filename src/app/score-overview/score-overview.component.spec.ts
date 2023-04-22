import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreOverviewComponent } from './score-overview.component';

describe('ScoreOverviewComponent', () => {
  let component: ScoreOverviewComponent;
  let fixture: ComponentFixture<ScoreOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
