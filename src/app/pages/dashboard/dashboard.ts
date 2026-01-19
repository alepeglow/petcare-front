import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

type PetStatus = 'DISPONIVEL' | 'ADOTADO';

type FeaturedPet = {
  id: number;
  name: string;
  breed: string;
  age: string;
  gender: 'Macho' | 'Fêmea';
  size: 'P' | 'M' | 'G';
  status: PetStatus;
  image: string;
  isFav: boolean;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  // ✅ pets em destaque (os 3 da home)
  featuredPets: FeaturedPet[] = [
    {
      id: 1,
      name: 'Thor',
      breed: 'Golden Retriever',
      age: '2 anos',
      gender: 'Macho',
      size: 'M',
      status: 'DISPONIVEL',
      image: '/assets/images/pets/dog-1.png',
      isFav: false,
    },
    {
      id: 2,
      name: 'Luna',
      breed: 'Gato Persa',
      age: '1 ano',
      gender: 'Fêmea',
      size: 'P',
      status: 'DISPONIVEL',
      image: '/assets/images/pets/cat-1.png',
      isFav: false,
    },
    {
      id: 3,
      name: 'Max',
      breed: 'Beagle',
      age: '6 meses',
      gender: 'Macho',
      size: 'P',
      status: 'DISPONIVEL',
      image: '/assets/images/pets/dog-2.png',
      isFav: false,
    },
  ];

  toggleFav(id: number) {
    this.featuredPets = this.featuredPets.map(p =>
      p.id === id ? { ...p, isFav: !p.isFav } : p
    );
  }
}
