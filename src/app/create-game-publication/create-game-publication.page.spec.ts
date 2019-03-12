import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGamePublicationPage } from './create-game-publication.page';

describe('CreateGamePublicationPage', () => {
  let component: CreateGamePublicationPage;
  let fixture: ComponentFixture<CreateGamePublicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGamePublicationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGamePublicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
