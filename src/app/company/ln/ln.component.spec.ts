import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LnComponent } from './ln.component';

describe('LnComponent', () => {
  let component: LnComponent;
  let fixture: ComponentFixture<LnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
