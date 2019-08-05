import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteinComponent } from './stein.component';

describe('SteinComponent', () => {
  let component: SteinComponent;
  let fixture: ComponentFixture<SteinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
