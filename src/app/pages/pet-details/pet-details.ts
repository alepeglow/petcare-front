// src/app/pages/pet-details/pet-details.ts
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { getPetById, PET_META, type Pet, type PetMeta } from '../pets/pets.data';
import {
  getHistoryByPetId,
  type PetHistoryCategory,
  type PetHistoryEvent,
} from '../pets/pets-history.data';

type TabKey = 'adocao' | 'historico' | 'cuidados';
type HistoryFilter = 'Todos' | PetHistoryCategory;

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

  // ===== Tabs =====
  tab = signal<TabKey>('adocao');
  setTab(t: TabKey) {
    this.tab.set(t);
  }

  // ===== ID da rota =====
  petId = signal<number>(0);

  constructor() {
    this.route.paramMap.subscribe((pm) => {
      const id = Number(pm.get('id') ?? 0);
      this.petId.set(Number.isFinite(id) ? id : 0);
    });
  }

  // ===== Dados do Pet =====
  pet = computed<Pet | null>(() => getPetById(this.petId()) ?? null);
  meta = computed<PetMeta | null>(() => PET_META[this.petId()] ?? null);

  // ===== Histórico =====
  history = computed<PetHistoryEvent[]>(() => getHistoryByPetId(this.petId()) ?? []);

  // lista fixa (pra renderizar os botões)
  historyCategories = ['Saúde', 'Adoção', 'Admin', 'Sistema', 'Clínica'] as const;

  historyFilter = signal<HistoryFilter>('Todos');
  setHistoryFilter(f: HistoryFilter) {
    this.historyFilter.set(f);
  }

  filteredHistory = computed(() => {
    const items = this.history();
    const f = this.historyFilter();
    if (f === 'Todos') return items;
    return items.filter((ev) => ev.category === f);
  });

  totalEvents = computed(() => this.history().length);

  // assume que o array vem com o MAIS RECENTE primeiro
  lastEvent = computed(() => this.history()[0]?.dateTime ?? '—');

  // ✅ “Última Atualização” = “Último Evento”
  ultimaAtualizacao = computed(() => this.lastEvent());

  // Card da aba Histórico
  healthStatus = computed(() => (this.history().length ? 'Saudável' : '—'));

  // ===== Helpers Adoção =====
  statusIsAdopted = computed(() => this.pet()?.status === 'ADOTADO');

  statusIcon = computed(() => (this.statusIsAdopted() ? 'verified' : 'check_circle'));
  statusLabel = computed(() => (this.statusIsAdopted() ? 'Adotado' : 'Disponível'));
  statusLongLabel = computed(() =>
    this.statusIsAdopted() ? 'Adotado' : 'Disponível para Adoção'
  );

  // ===== Helpers Badge/Cores por categoria =====
  // (use o que teu HTML estiver chamando: categoryClass(...) OU categoryBadgeClass(...))
  categoryClass(cat: PetHistoryCategory): 'saude' | 'adocao' | 'admin' | 'sistema' | 'clinica' {
    switch (cat) {
      case 'Saúde':
        return 'saude';
      case 'Adoção':
        return 'adocao';
      case 'Admin':
        return 'admin';
      case 'Sistema':
        return 'sistema';
      case 'Clínica':
        return 'clinica';
    }
  }

  categoryBadgeClass(cat: PetHistoryCategory) {
    switch (cat) {
      case 'Saúde':
        return 'pdH__badge--saude';
      case 'Clínica':
        return 'pdH__badge--clinica';
      case 'Adoção':
        return 'pdH__badge--adocao';
      case 'Admin':
        return 'pdH__badge--admin';
      case 'Sistema':
        return 'pdH__badge--sistema';
      default:
        return '';
    }
  }

  // ===== Navegação =====
  goToAdopt() {
    const id = this.petId();
    if (!id) return;
    this.router.navigate(['/pets', id, 'adotar']);
  }

  // ===== Admin stubs =====
  editPet() {
    console.log('Editar pet', this.petId());
  }

  deletePet() {
    console.log('Deletar pet', this.petId());
  }
}
