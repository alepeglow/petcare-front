import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adocoes } from './adocoes';

describe('Adocoes', () => {
  let component: Adocoes;
  let fixture: ComponentFixture<Adocoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adocoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adocoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
