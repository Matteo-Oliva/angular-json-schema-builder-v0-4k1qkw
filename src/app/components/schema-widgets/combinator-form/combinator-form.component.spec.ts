import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinatorFormComponent } from './combinator-form.component';

describe('CombinatorFormComponent', () => {
  let component: CombinatorFormComponent;
  let fixture: ComponentFixture<CombinatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombinatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
