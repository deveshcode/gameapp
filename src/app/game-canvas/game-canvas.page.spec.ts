import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCanvasPage } from './game-canvas.page';

describe('GameCanvasPage', () => {
  let component: GameCanvasPage;
  let fixture: ComponentFixture<GameCanvasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCanvasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCanvasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
