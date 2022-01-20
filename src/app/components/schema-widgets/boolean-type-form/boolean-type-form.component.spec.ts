import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanTypeFormComponent } from './boolean-type-form.component';

describe('BooleanTypeFormComponent', () => {
  let component: BooleanTypeFormComponent;
  let fixture: ComponentFixture<BooleanTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
