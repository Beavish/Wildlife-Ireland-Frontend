import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildlifeCrimeComponent } from './wildlife-crime.component';

describe('WildlifeCrimeComponent', () => {
  let component: WildlifeCrimeComponent;
  let fixture: ComponentFixture<WildlifeCrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WildlifeCrimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WildlifeCrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
