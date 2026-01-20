import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { getPetById, PET_META, type PetMeta } from '../pets/pets.data';
import { getHistoryByPetId, type PetHistoryCategory, type PetHistoryEvent } from '../pets/pets-history.data';

type TabKey = 'adocao' | 'historico' | 'cuidados';
type HistoryFilter = 'Todos' | PetHistoryCategory;

// ===== CUIDADOS (mock por enquanto) =====
type CareType = 'VACINA' | 'CONSULTA' | 'VERMIFUGO' | 'BANHO' | 'TOSA';
type CareFilter = 'Todos' | CareType;

type CareItem = {
  id: number;
  petId: number;
  type: CareType;
  date: string; // ISO "2025-12-12" (fica fácil ordenar)
  description?: string;
  icon: string;
};

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatChipsModule, MatDividerModule, MatIconModule],
  templateUrl: './pet-details.html',
  styleUrls: ['./pet-details.scss'],
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

  // ID da rota
  petId = signal<number>(0);

  constructor() {
    this.route.paramMap.subscribe((pm) => {
      const id = Number(pm.get('id') ?? 0);
      this.petId.set(Number.isFinite(id) ? id : 0);
    });
  }

  // ===== PET + META =====
  pet = computed(() => getPetById(this.petId()) ?? null);
  meta = computed<PetMeta | null>(() => PET_META[this.petId()] ?? null);

  // ===== HISTÓRICO =====
  historyCategories: readonly PetHistoryCategory[] = ['Saúde', 'Adoção', 'Admin', 'Sistema', 'Clínica'] as const;

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

  // assume que o array vem mais recente primeiro; se não vier, depois a gente ordena
  lastEvent = computed(() => this.history()[0]?.dateTime ?? '—');

  // ✅ regra que tu pediu:
  // "Última Atualização" = data do "Último Evento" do histórico
  ultimaAtualizacao = computed(() => this.lastEvent());

  // saúde atual (simples e rápido)
  healthStatus = computed(() => (this.history().length ? 'Saudável' : '—'));

  // classes de categoria (bate com teu HTML: 'pdH__badge--' + categoryClass(...) )
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

  // ===== STATUS ADOÇÃO =====
  statusIsAdopted() {
    return this.pet()?.status === 'ADOTADO';
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

  // ===== CUIDADOS (MOCK POR ENQUANTO) =====
  private CARE_MOCK: CareItem[] = [
    // pet 1 (se quiser ter algo no 1 também)
    { id: 101, petId: 1, type: 'BANHO', date: '2025-12-01', description: 'Banho simples', icon: 'shower' },

    // pet 2
    { id: 14, petId: 2, type: 'VACINA', date: '2025-12-12', description: 'Vacina antirrábica', icon: 'vaccines' },

    // pet 3
    { id: 3, petId: 3, type: 'VACINA', date: '2025-11-25', description: 'Vacina V10 (reforço anual)', icon: 'vaccines' },
    { id: 2, petId: 3, type: 'BANHO', date: '2025-12-12', description: 'Banho + secagem', icon: 'shower' },

    // pet 4
    { id: 4, petId: 4, type: 'CONSULTA', date: '2025-12-03', description: 'Consulta de rotina e avaliação geral', icon: 'medical_services' },
    { id: 10, petId: 4, type: 'TOSA', date: '2025-12-04', description: 'Corte de unhas', icon: 'content_cut' },
    { id: 15, petId: 4, type: 'VACINA', date: '2025-12-12', description: 'Vacina antirrábica', icon: 'vaccines' },

    // pet 6
    { id: 8, petId: 6, type: 'BANHO', date: '2025-12-12', description: 'Banho com shampoo neutro', icon: 'shower' },
    { id: 16, petId: 6, type: 'BANHO', date: '2025-12-12', icon: 'shower' },

    // pet 7
    { id: 5, petId: 7, type: 'VERMIFUGO', date: '2025-12-04', description: 'Vermífugo dose única', icon: 'medication' },
    { id: 11, petId: 7, type: 'BANHO', date: '2025-12-10', description: 'Banho simples', icon: 'shower' },
  ];

  care = computed<CareItem[]>(() => {
    const id = this.petId();
    return this.CARE_MOCK.filter((c) => c.petId === id)
      .slice()
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  });

  careFilter = signal<CareFilter>('Todos');
  setCareFilter(f: CareFilter) {
    this.careFilter.set(f);
  }

  careTypes = computed<CareType[]>(() => ['VACINA', 'CONSULTA', 'VERMIFUGO', 'BANHO', 'TOSA']);

  filteredCare = computed(() => {
    const items = this.care();
    const f = this.careFilter();
    if (f === 'Todos') return items;
    return items.filter((c) => c.type === f);
  });

  totalCare = computed(() => this.care().length);

  lastCare = computed(() => this.care()[0]?.date ?? '—');

  carePillLabel(t: CareType | 'Todos') {
    switch (t) {
      case 'Todos':
        return 'Todos';
      case 'VACINA':
        return 'Vacina';
      case 'CONSULTA':
        return 'Consulta';
      case 'VERMIFUGO':
        return 'Vermífugo';
      case 'BANHO':
        return 'Banho';
      case 'TOSA':
        return 'Tosa';
    }
  }

  // retorna sufixo usado no CSS: pdC__badge--{sufixo}
  careBadgeClass(t: CareType) {
    switch (t) {
      case 'VACINA':
        return 'vacina';
      case 'CONSULTA':
        return 'consulta';
      case 'VERMIFUGO':
        return 'vermifugo';
      case 'BANHO':
        return 'banho';
      case 'TOSA':
        return 'tosa';
    }
  }
}
