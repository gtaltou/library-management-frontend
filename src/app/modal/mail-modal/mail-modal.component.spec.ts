import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailModalComponent } from './mail-modal.component';

describe('MailModalComponent', () => {
  let component: MailModalComponent;
  let fixture: ComponentFixture<MailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
