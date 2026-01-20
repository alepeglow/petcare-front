import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { getPetById, PET_META, type Pet, type PetMeta } from '../pets/pets.data';

type TabKey = 'adocao' | 'historico' | 'cuidados';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './pet-details.html',
  styleUrl: './pet-details.scss',
})
export class PetDetails {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // 🔒 depois tu troca por auth real
  isAdmin = signal(false);

  // tabs
  tab = signal<TabKey>('adocao');
  setTab(t: TabKey) {
    this.tab.set(t);
  }

  // estado
  petId = signal<number>(0);
  pet = signal<Pet | null>(null);
  meta = signal<PetMeta | null>(null);

  constructor() {
    this.route.paramMap.subscribe((pm) => {
      const id = Number(pm.get('id') ?? 0);
      this.petId.set(Number.isFinite(id) ? id : 0);

      const p = getPetById(id) ?? null;
      this.pet.set(p);

      this.meta.set(PET_META[id] ?? null);
    });
  }

  // helpers
  statusIsAdopted() {
    return this.pet()?.status === 'ADOTADO';
  }

  statusIcon() {
    return this.statusIsAdopted() ? 'verified' : 'check_circle';
  }

  statusLabel() {
    return this.statusIsAdopted() ? 'Adotado' : 'Disponível';
  }

  statusLongLabel() {
    return this.statusIsAdopted() ? 'Adotado' : 'Disponível para Adoção';
  }

  // navegação
  goToAdopt() {
    const id = this.petId();
    if (!id) return;
    this.router.navigate(['/pets', id, 'adotar']);
  }

  // admin stubs
  editPet() {
    console.log('Editar pet', this.petId());
  }

  deletePet() {
    console.log('Deletar pet', this.petId());
  }
}
