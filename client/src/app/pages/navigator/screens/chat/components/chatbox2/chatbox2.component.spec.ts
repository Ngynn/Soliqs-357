import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chatbox2Component } from './chatbox2.component';

describe('Chatbox2Component', () => {
  let component: Chatbox2Component;
  let fixture: ComponentFixture<Chatbox2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chatbox2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chatbox2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
