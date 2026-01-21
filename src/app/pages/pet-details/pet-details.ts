import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PetsStore } from '../../core/state/pets.store';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { getPetById, PET_META, type PetMeta } from '../pets/pets.data';
import { getHistoryByPetId, type PetHistoryCategory, type PetHistoryEvent } from '../pets/pets-history.data';

import { CuidadosService, type CareType } from '../../core/services/cuidados.service';

type TabKey = 'adocao' | 'historico' | 'cuidados';
type HistoryFilter = 'Todos' | PetHistoryCategory;

type CareFilter = 'Todos' | CareType;

type CareItem = {
  id: number;
  petId: number;
  type: CareType;
  date: string; // ISO "2025-12-12"
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
  private cuidadosService = inject(CuidadosService);
  private petsStore = inject(PetsStore);


    // ===== Formatadores (pra deixar bonito na apresentação) =====
  formatDateBR(iso: string) {
    // Se já estiver em formato BR (dd/MM/yyyy...), só retorna
    if (!iso) return '—';
    if (iso.includes('/')) return iso;

    // Espera ISO: yyyy-MM-dd
    const parts = iso.split('-');
    if (parts.length !== 3) return iso;

    const [y, m, d] = parts;
    if (!y || !m || !d) return iso;

    return `${d}/${m}/${y}`;
  }

  // 🔒 depois tu troca por auth real
  isAdmin = signal(false);

  // Tabs
  tab = signal<TabKey>('adocao');
  setTab(t: TabKey) {
    this.tab.set(t);

    // quando entrar na aba cuidados, tenta buscar do back
    if (t === 'cuidados') {
      this.fetchCuidados();
    }
  }

  // ID da rota
  petId = signal<number>(0);

  constructor() {
    this.route.paramMap.subscribe((pm) => {
      const id = Number(pm.get('id') ?? 0);
      const safeId = Number.isFinite(id) ? id : 0;
      this.petId.set(safeId);

      // sempre que mudar o pet, reseta estado e pré-carrega se já estiver na aba
      this.resetCuidadosState();
      if (this.tab() === 'cuidados') {
        this.fetchCuidados();
      }
    });
  }

  // ===== PET + META =====
  pet = computed(() => this.petsStore.getById(this.petId()) ?? getPetById(this.petId()) ?? null);

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

  // ✅ regra:
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

  // ===== CUIDADOS (BACK + FALLBACK MOCK) =====

  // Mock antigo continua como fallback (se a API falhar)
  private CARE_MOCK: CareItem[] = [
    { id: 101, petId: 1, type: 'BANHO', date: '2025-12-01', description: 'Banho simples', icon: 'shower' },
    { id: 14, petId: 2, type: 'VACINA', date: '2025-12-12', description: 'Vacina antirrábica', icon: 'vaccines' },
    { id: 3, petId: 3, type: 'VACINA', date: '2025-11-25', description: 'Vacina V10 (reforço anual)', icon: 'vaccines' },
    { id: 2, petId: 3, type: 'BANHO', date: '2025-12-12', description: 'Banho + secagem', icon: 'shower' },
    { id: 4, petId: 4, type: 'CONSULTA', date: '2025-12-03', description: 'Consulta de rotina e avaliação geral', icon: 'medical_services' },
    { id: 10, petId: 4, type: 'TOSA', date: '2025-12-04', description: 'Corte de unhas', icon: 'content_cut' },
    { id: 15, petId: 4, type: 'VACINA', date: '2025-12-12', description: 'Vacina antirrábica', icon: 'vaccines' },
    { id: 8, petId: 6, type: 'BANHO', date: '2025-12-12', description: 'Banho com shampoo neutro', icon: 'shower' },
    { id: 16, petId: 6, type: 'BANHO', date: '2025-12-12', icon: 'shower' },
    { id: 5, petId: 7, type: 'VERMIFUGO', date: '2025-12-04', description: 'Vermífugo dose única', icon: 'medication' },
    { id: 11, petId: 7, type: 'BANHO', date: '2025-12-10', description: 'Banho simples', icon: 'shower' },
  ];

  // estado do back
  cuidadosLoading = signal(false);
  cuidadosError = signal(false);
  cuidadosFromApi = signal<CareItem[]>([]);
  private cuidadosLoadedForPetId = signal<number | null>(null);

  private resetCuidadosState() {
    this.cuidadosLoading.set(false);
    this.cuidadosError.set(false);
    this.cuidadosFromApi.set([]);
    this.cuidadosLoadedForPetId.set(null);
    this.careFilter.set('Todos');
  }

  private iconByCareType(t: CareType): string {
    switch (t) {
      case 'VACINA':
        return 'vaccines';
      case 'CONSULTA':
        return 'medical_services';
      case 'VERMIFUGO':
        return 'medication';
      case 'BANHO':
        return 'shower';
      case 'TOSA':
        return 'content_cut';
    }
  }

  /**
   * Mapeamento tolerante: aceita snake_case e camelCase,
   * e também formato com pet { id }.
   */
  private mapApiToCareItem(dto: any): CareItem {
    const petId = dto.id_pet ?? dto.idPet ?? dto.petId ?? dto.pet?.id;
    const date = dto.data_cuidado ?? dto.dataCuidado ?? dto.data;
    const type = dto.tipo;

    return {
      id: dto.id,
      petId: Number(petId ?? this.petId()),
      type: type,
      date: (date ?? '').toString(),
      description: dto.descricao ?? dto.description ?? undefined,
      icon: this.iconByCareType(type),
    };
  }

  private fetchCuidados() {
    const id = this.petId();
    if (!id) return;

    // já carregou pra esse pet? não chama de novo
    if (this.cuidadosLoadedForPetId() === id) return;

    this.cuidadosLoading.set(true);
    this.cuidadosError.set(false);

    this.cuidadosService.getByPetId(id).subscribe({
      next: (list) => {
        const mapped = (list ?? [])
          .map((x: any) => this.mapApiToCareItem(x))
          .filter((x) => x.petId === id)
          .slice()
          .sort((a, b) => ((a.date || '') < (b.date || '') ? 1 : -1));

        this.cuidadosFromApi.set(mapped);
        this.cuidadosLoadedForPetId.set(id);
        this.cuidadosLoading.set(false);
      },
      error: () => {
        // fallback pro mock quando der erro na API
        this.cuidadosError.set(true);
        this.cuidadosFromApi.set([]);
        this.cuidadosLoadedForPetId.set(id);
        this.cuidadosLoading.set(false);
      },
    });
  }

  // Fonte final para UI (sempre ordenado desc)
  care = computed<CareItem[]>(() => {
    const id = this.petId();
    const apiItems = this.cuidadosFromApi();

    let items: CareItem[];

    if (apiItems.length) {
      items = apiItems;
    } else if (this.cuidadosError()) {
      items = this.CARE_MOCK.filter((c) => c.petId === id);
    } else {
      items = [];
    }

    return items.slice().sort((a, b) => ((a.date || '') < (b.date || '') ? 1 : -1));
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

  // ✅ pega o último cuidado ignorando date vazio
  lastCare = computed(() => {
    const dated = this.care().filter((c) => !!c.date);
    return dated.length ? dated[0].date : '—';
  });

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


