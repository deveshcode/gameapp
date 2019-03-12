import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGameModePage } from './create-game-mode.page';

describe('CreateGameModePage', () => {
  let component: CreateGameModePage;
  let fixture: ComponentFixture<CreateGameModePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGameModePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameModePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
