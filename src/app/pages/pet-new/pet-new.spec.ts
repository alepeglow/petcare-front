import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetNew } from './pet-new';

describe('PetNew', () => {
  let component: PetNew;
  let fixture: ComponentFixture<PetNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
