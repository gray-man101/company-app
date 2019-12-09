import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLnComponent } from './company-ln.component';

describe('LnComponent', () => {
  let component: CompanyLnComponent;
  let fixture: ComponentFixture<CompanyLnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
