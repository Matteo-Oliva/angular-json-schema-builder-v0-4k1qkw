import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { EnumStringInputFormComponent } from './enum-string-input-form.component';

describe('EnumInputFormComponent', () => {
  let component: EnumStringInputFormComponent;
  let fixture: ComponentFixture<EnumStringInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnumStringInputFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumStringInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
