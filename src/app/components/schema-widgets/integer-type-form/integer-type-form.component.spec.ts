import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegerTypeFormComponent } from './integer-type-form.component';

describe('IntegerTypeFormComponent', () => {
  let component: IntegerTypeFormComponent;
  let fixture: ComponentFixture<IntegerTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegerTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegerTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
