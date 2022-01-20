import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringTypeFormComponent } from './string-type-form.component';

describe('StringTypeFormComponent', () => {
  let component: StringTypeFormComponent;
  let fixture: ComponentFixture<StringTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
