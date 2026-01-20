import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { getPetById, PET_META, type Pet, type PetMeta } from '../pets/pets.data';
import { getHistoryByPetId, type PetHistoryEvent, type PetHistoryCategory } from '../pets/pets-history.data';

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

  // Tabs
  tab = signal<TabKey>('adocao');
  setTab(t: TabKey) {
    this.tab.set(t);
  }

  // Estado base
  petId = signal<number>(0);
  pet = signal<Pet | null>(null);
  meta = signal<PetMeta | null>(null);

  // ===== HISTÓRICO =====
  historyCategories = ['Saúde', 'Adoção', 'Admin', 'Sistema', 'Clínica'] as const;

  history = computed<PetHistoryEvent[]>(() => getHistoryByPetId(this.petId()) ?? []);

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

  // assume que teu array já vem em ordem (mais recente primeiro)
  lastEvent = computed(() => this.history()[0]?.dateTime ?? '—');

  // ✅ AQUI resolve teu problema: Última Atualização sempre igual ao último evento.
  ultimaAtualizacao = computed(() => this.lastEvent());

  // “Saúde Atual” pro card do Histórico (simples e rápido, depois tu refina)
  saudeAtual = computed(() => {
    // regra básica (sem perder tempo): se existe histórico, considera “Saudável”
    // depois: tu pode mudar pra detectar alertas, pendências, etc.
    return this.history().length ? 'Saudável' : '—';
  });

  constructor() {
    this.route.paramMap.subscribe((pm) => {
      const id = Number(pm.get('id') ?? 0);
      const safeId = Number.isFinite(id) ? id : 0;

      this.petId.set(safeId);

      const p = getPetById(safeId) ?? null;
      this.pet.set(p);

      this.meta.set(PET_META[safeId] ?? null);
    });
  }

  // ===== Helpers Adoção =====
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

  // ===== Helpers Histórico (badge/label) =====
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
