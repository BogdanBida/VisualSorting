/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LogicCoreComponent } from './logic-core.component';

describe('LogicCoreComponent', () => {
  let component: LogicCoreComponent;
  let fixture: ComponentFixture<LogicCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
