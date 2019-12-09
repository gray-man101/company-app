import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableLnComponent } from './available-ln.component';

describe('CustomerLnComponent', () => {
  let component: AvailableLnComponent;
  let fixture: ComponentFixture<AvailableLnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableLnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableLnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
