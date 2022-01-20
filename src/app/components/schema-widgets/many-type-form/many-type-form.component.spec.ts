import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManyTypeFormComponent } from './many-type-form.component';

describe('ManyTypeFormComponent', () => {
  let component: ManyTypeFormComponent;
  let fixture: ComponentFixture<ManyTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManyTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManyTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
