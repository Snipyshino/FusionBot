import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalyListComponent } from './anomaly-list.component';

describe('AnomalyListComponent', () => {
  let component: AnomalyListComponent;
  let fixture: ComponentFixture<AnomalyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnomalyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnomalyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
