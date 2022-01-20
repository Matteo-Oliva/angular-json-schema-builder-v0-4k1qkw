import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaToFormComponent } from './schema-to-form.component';

describe('SchemaToFormComponent', () => {
  let component: SchemaToFormComponent;
  let fixture: ComponentFixture<SchemaToFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaToFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaToFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
