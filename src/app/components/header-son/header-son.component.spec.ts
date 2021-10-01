import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSonComponent } from './header-son.component';

describe('HeaderSonComponent', () => {
  let component: HeaderSonComponent;
  let fixture: ComponentFixture<HeaderSonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
