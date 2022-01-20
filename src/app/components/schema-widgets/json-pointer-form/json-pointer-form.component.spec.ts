import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonPointerFormComponent } from './json-pointer-form.component';

describe('JsonPointerFormComponent', () => {
  let component: JsonPointerFormComponent;
  let fixture: ComponentFixture<JsonPointerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonPointerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonPointerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
