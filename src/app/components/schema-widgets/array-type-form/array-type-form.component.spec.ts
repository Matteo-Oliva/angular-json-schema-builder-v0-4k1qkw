import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayTypeFormComponent } from './array-type-form.component';

describe('ArrayTypeFormComponent', () => {
  let component: ArrayTypeFormComponent;
  let fixture: ComponentFixture<ArrayTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
