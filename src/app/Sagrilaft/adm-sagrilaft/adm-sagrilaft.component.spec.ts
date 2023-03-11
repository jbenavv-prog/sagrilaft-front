import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmSagrilaftComponent } from './adm-sagrilaft.component';

describe('AdmSagrilaftComponent', () => {
  let component: AdmSagrilaftComponent;
  let fixture: ComponentFixture<AdmSagrilaftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmSagrilaftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmSagrilaftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
