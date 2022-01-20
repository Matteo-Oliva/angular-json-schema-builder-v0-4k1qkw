import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NullTypeFormComponent } from './null-type-form.component';

describe('NullTypeFormComponent', () => {
  let component: NullTypeFormComponent;
  let fixture: ComponentFixture<NullTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NullTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NullTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
