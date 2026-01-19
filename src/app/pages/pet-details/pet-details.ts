import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getPetById, Pet } from '../pets/pets.data';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
  ],
  templateUrl: './pet-details.html',
  styleUrl: './pet-details.scss',
})
export class PetDetails {
  private route = inject(ActivatedRoute);

  private petId = signal<number>(0);

  pet = computed<Pet | undefined>(() => getPetById(this.petId()));

  constructor() {
    this.route.paramMap.subscribe(pm => {
      const id = Number(pm.get('id') ?? 0);
      this.petId.set(Number.isFinite(id) ? id : 0);
    });
  }
}

