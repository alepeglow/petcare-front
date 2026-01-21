import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PetsService } from '../../core/services/pets.service';
import { PetsStore } from '../../core/state/pets.store';
import type { Pet } from '../pets/pets.data';

type ApiPet = {
  id?: number;
  nome?: string;
  raca?: string;
  especie?: 'CACHORRO' | 'GATO' | 'Cachorro' | 'Gato';
  sexo?: 'MACHO' | 'FEMEA' | 'Macho' | 'Fêmea';
  porte?: 'P' | 'M' | 'G';
  status?: 'DISPONIVEL' | 'ADOTADO';
  dataEntrada?: string; // ISO "2026-01-21" (normalmente LocalDate)
};

@Component({
  selector: 'app-pet-new',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './pet-new.html',
  styleUrl: './pet-new.scss',
})
export class PetNew {
  private router = inject(Router);
  private petsService = inject(PetsService);
  private petsStore = inject(PetsStore);

  saving = signal(false);

  // ISO de hoje (bom pro input type="date")
  private todayIso(): string {
    return new Date().toISOString().slice(0, 10);
  }

  model = {
    name: '',
    breed: '',
    species: 'Cachorro' as 'Cachorro' | 'Gato',
    gender: 'Macho' as 'Macho' | 'Fêmea',
    size: 'M' as 'P' | 'M' | 'G',
    entryDate: this.todayIso(), // <-- IMPORTANTE (back pediu dataEntrada)
  };

  private defaultImageBySpecies(): string {
    return this.model.species === 'Gato'
      ? '/assets/images/pets/cat-1.png'
      : '/assets/images/pets/dog-1.png';
  }

  private mapSpeciesToApi(v: 'Cachorro' | 'Gato'): 'CACHORRO' | 'GATO' {
    return v === 'Gato' ? 'GATO' : 'CACHORRO';
  }

  private mapGenderToApi(v: 'Macho' | 'Fêmea'): 'MACHO' | 'FEMEA' {
    return v === 'Fêmea' ? 'FEMEA' : 'MACHO';
  }

  private isoToBR(iso?: string): string {
    if (!iso) return '—';
    // iso esperado: YYYY-MM-DD
    const [y, m, d] = iso.split('-');
    if (!y || !m || !d) return iso;
    return `${d}/${m}/${y}`;
  }

  cancel() {
    this.router.navigate(['/pets']);
  }

  save() {
    const nome = this.model.name.trim();
    const raca = this.model.breed.trim();

    if (!nome || !raca) {
      alert('Preencha pelo menos Nome e Raça.');
      return;
    }

    // se teu HTML não tiver input date, isso aqui evita mandar vazio
    const dataEntrada = (this.model.entryDate || this.todayIso()).trim();

    this.saving.set(true);

    // ✅ NÃO MANDA id NO CREATE
    const payload = {
      nome,
      raca,
      especie: this.mapSpeciesToApi(this.model.species),
      sexo: this.mapGenderToApi(this.model.gender),
      porte: this.model.size,
      status: 'DISPONIVEL' as const,
      dataEntrada, // ISO YYYY-MM-DD
    };

    this.petsService.create(payload).subscribe({
      next: (created: ApiPet) => {
        const newId =
          created?.id ??
          Math.max(...this.petsStore.pets().map((p) => p.id), 0) + 1;

        const newPet: Pet = {
          id: newId,
          name: created?.nome ?? payload.nome,
          breed: created?.raca ?? payload.raca,
          age: '—',
          gender: this.model.gender,
          size: this.model.size,
          species: this.model.species,
          status: 'DISPONIVEL',
          image: this.defaultImageBySpecies(),
          isFav: false,

          entryDate: this.isoToBR(created?.dataEntrada ?? payload.dataEntrada),
          weightKg: 0,
          color: '—',
          traits: [],
        };

        this.petsStore.pets.update((list) => [newPet, ...list]);

        this.saving.set(false);
        this.router.navigate(['/pets']);
      },
      error: (err) => {
        console.error(err);
        this.saving.set(false);

        // Se vier 409, normalmente é constraint (ex.: nome duplicado) OU back entendeu como update
        if (err?.status === 409) {
          alert(
            'Conflito ao salvar (409). Verifique se o back exige campos únicos (ex.: nome) ou se ele está tentando atualizar em vez de criar.'
          );
          return;
        }

        alert('Não consegui salvar no back. Verifique /pets e CORS.');
      },
    });
  }
}
