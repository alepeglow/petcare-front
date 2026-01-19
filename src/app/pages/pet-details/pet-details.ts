import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { getPetById, type Pet } from '../pets/pets.data';

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

  // 🔒 por enquanto (depois tu troca por auth real)
  // quando tiver login/admin, só trocar esse signal com base no usuário logado
  isAdmin = signal(false);

  // estado do pet atual
  pet = signal<Pet | null>(null);

  // id vindo da rota /pets/:id
  petId = signal<number | null>(null);

  // view helpers
  notFound = computed(() => this.petId() !== null && this.pet() === null);

  statusLabel = computed(() => (this.pet()?.status === 'ADOTADO' ? 'Adotado' : 'Disponível'));
  statusIcon = computed(() => (this.pet()?.status === 'ADOTADO' ? 'verified' : 'check_circle'));
  statusIsAdopted = computed(() => this.pet()?.status === 'ADOTADO');

  // exemplo de “características” (depois tu pode vir do back-end)
  // por enquanto retorna um set fixo pra bater com teu design
  characteristics = computed(() => {
    // tu pode personalizar por pet depois
    return ['Dócil', 'Brincalhão', 'Vacinado', 'Castrado'];
  });

  // infos extras (depois vira campos no Pet do back)
  // aqui é só pra preencher o layout “Raça / Idade / Data / Peso / Cor”
  // se tu quiser, eu te mando também a atualização do Pet type pra incluir isso.
  extraInfo = computed(() => {
    const p = this.pet();
    if (!p) return null;

    // defaults (tu pode alterar por id depois)
    const defaultsById: Record<number, { entryDate: string; weightKg: number; color: string }> = {
      1: { entryDate: '15/01/2025', weightKg: 24, color: 'Dourado' },
      2: { entryDate: '21/01/2025', weightKg: 12, color: 'Tricolor' },
      3: { entryDate: '10/01/2025', weightKg: 28, color: 'Dourado' }, // Bob labrador
      4: { entryDate: '02/02/2025', weightKg: 6, color: 'Branco/Caramelo' },
      5: { entryDate: '20/12/2024', weightKg: 18, color: 'Preto/Branco' },
      6: { entryDate: '18/12/2024', weightKg: 16, color: 'Caramelo' },

      7: { entryDate: '12/01/2025', weightKg: 4, color: 'Branco' },
      8: { entryDate: '09/01/2025', weightKg: 7, color: 'Cinza Rajado' },
      9: { entryDate: '28/01/2025', weightKg: 4, color: 'Creme/Marrom' },
      10: { entryDate: '05/02/2025', weightKg: 5, color: 'Branco' },
      11: { entryDate: '22/12/2024', weightKg: 3, color: 'Preto/Branco' },
      12: { entryDate: '30/01/2025', weightKg: 5, color: 'Creme/Cinza' },
    };

    return defaultsById[p.id] ?? { entryDate: '15/01/2025', weightKg: 10, color: '—' };
  });

  constructor() {
    // lê o :id da rota e carrega o pet
    this.route.paramMap.subscribe(pm => {
      const id = Number(pm.get('id'));
      if (!Number.isFinite(id)) {
        this.petId.set(null);
        this.pet.set(null);
        return;
      }

      this.petId.set(id);
      this.pet.set(getPetById(id) ?? null);
    });
  }

  // navegação
  goToAdopt() {
    const id = this.petId();
    if (!id) return;
    this.router.navigate(['/pets', id, 'adotar']);
  }

  // ações admin (stubs)
  editPet() {
    // depois: /admin/pets/:id/editar ou abrir modal
    console.log('Editar pet', this.petId());
  }

  deletePet() {
    // depois: confirmar + chamar API
    console.log('Deletar pet', this.petId());
  }
}

