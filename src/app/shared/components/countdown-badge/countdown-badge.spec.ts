import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownBadge } from './countdown-badge';

describe('CountdownBadge', () => {
  let component: CountdownBadge;
  let fixture: ComponentFixture<CountdownBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(CountdownBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
