import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaBuilderFormComponent } from './schema-builder-form.component';

describe('SchemaBuilderFormComponent', () => {
  let component: SchemaBuilderFormComponent;
  let fixture: ComponentFixture<SchemaBuilderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaBuilderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaBuilderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
