import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberTypeFormComponent } from './number-type-form.component';

describe('NumberTypeFormComponent', () => {
  let component: NumberTypeFormComponent;
  let fixture: ComponentFixture<NumberTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
