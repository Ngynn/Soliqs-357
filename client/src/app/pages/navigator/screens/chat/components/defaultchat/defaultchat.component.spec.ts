import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultchatComponent } from './defaultchat.component';

describe('DefaultchatComponent', () => {
  let component: DefaultchatComponent;
  let fixture: ComponentFixture<DefaultchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultchatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
