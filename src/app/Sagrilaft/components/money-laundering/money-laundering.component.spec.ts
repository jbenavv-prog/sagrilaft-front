import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyLaunderingComponent } from './money-laundering.component';

describe('MoneyLaunderingComponent', () => {
  let component: MoneyLaunderingComponent;
  let fixture: ComponentFixture<MoneyLaunderingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyLaunderingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyLaunderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
