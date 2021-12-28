import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToMenuComponent } from './back-to-menu.component';

describe('BackToMenuComponent', () => {
  let component: BackToMenuComponent;
  let fixture: ComponentFixture<BackToMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackToMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackToMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
