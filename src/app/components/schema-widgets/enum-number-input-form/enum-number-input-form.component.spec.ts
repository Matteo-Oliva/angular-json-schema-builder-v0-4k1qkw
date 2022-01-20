import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumNumberInputFormComponent } from './enum-number-input-form.component';

describe('EnumNumberInputFormComponent', () => {
  let component: EnumNumberInputFormComponent;
  let fixture: ComponentFixture<EnumNumberInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumNumberInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumNumberInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
