import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import { CuidadosService, CuidadoApi, CareType } from '../../core/services/cuidados.service';
import { PetsStore } from '../../core/state/pets.store';

type CareFilter = 'Todos' | CareType;

type CareItem = {
  id: number;
  petId: number;        // 0 quando não vier do back
  type: CareType;
  date: string;         // ISO (ex: 2025-12-04) ou ISO completo
  cost: number | null;
  description: string;
  icon: string;
};

@Component({
  selector: 'app-cuidados',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './cuidados.html',
  styleUrl: './cuidados.scss',
})
export class Cuidados {
  private cuidadosService = inject(CuidadosService);
  private petsStore = inject(PetsStore);

  loading = signal(false);
  error = signal(false);

  search = signal('');
  careFilter = signal<CareFilter>('Todos');

  // lista já “pronta pro UI”
  itemsApi = signal<CareItem[]>([]);

  // ✅ pro HTML: careTypes()
  careTypes = computed<CareType[]>(() => ['VACINA', 'CONSULTA', 'VERMIFUGO', 'BANHO', 'TOSA']);

  // mapa (id -> nome do pet)
  petNameById = computed(() => new Map(this.petsStore.pets().map((p) => [p.id, p.name])));

  // ✅ cards do topo (o HTML tá usando totalCare / lastCare)
  totalCare = computed(() => this.itemsApi().length);

  lastCare = computed(() => this.itemsApi()[0] ?? null);

  lastCareLabel = computed(() => {
    const c = this.lastCare();
    if (!c) return '—';
    // exemplo: "21/01/2026 • Banho"
    return `${this.formatDateBR(c.date)} • ${this.carePillLabel(c.type)}`;
  });

  // ✅ lista filtrada (o HTML usa filtered())
  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const f = this.careFilter();

    let list = this.itemsApi();

    if (f !== 'Todos') list = list.filter((c) => c.type === f);

    if (q) {
      list = list.filter((c) => {
        const petName = (this.petNameById().get(c.petId) ?? '').toLowerCase();
        const desc = (c.description ?? '').toLowerCase();
        const type = this.carePillLabel(c.type).toLowerCase();
        return petName.includes(q) || desc.includes(q) || type.includes(q);
      });
    }

    return list;
  });

  constructor() {
    this.load();
  }

  // ✅ pro HTML: (input)="onSearchInput($event)"
  onSearchInput(ev: Event) {
    const value = (ev.target as HTMLInputElement).value ?? '';
    this.search.set(value);
  }

  // ✅ pro HTML: setCareFilter('Todos') / setCareFilter(t)
  setCareFilter(value: CareFilter) {
    this.careFilter.set(value);
  }

  // ✅ labels bonitos
  carePillLabel(t: CareType) {
    switch (t) {
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
      default:
        return t;
    }
  }

  // ✅ formata data
  formatDateBR(iso: string) {
    if (!iso) return '—';
    const d = new Date(iso.length === 10 ? `${iso}T00:00:00` : iso);
    return isNaN(d.getTime()) ? '—' : d.toLocaleDateString('pt-BR');
  }

  // ✅ ícones (evita “Consulta sem ícone”)
  icon(type: CareType) {
    switch (type) {
      case 'VACINA':
        return 'vaccines';
      case 'CONSULTA':
        return 'medical_services'; // ✅ stethoscope costuma não existir
      case 'VERMIFUGO':
        return 'bug_report';
      case 'BANHO':
        return 'shower'; // ✅ bathtub às vezes falha
      case 'TOSA':
        return 'content_cut';
      default:
        return 'event';
    }
  }

  load() {
    this.loading.set(true);
    this.error.set(false);

    this.cuidadosService.listAll().subscribe({
      next: (list: CuidadoApi[]) => {
        const mapped = (list ?? [])
          .map((x) => this.mapApiToCareItem(x))
          .slice()
          // desc por data (mais recente primeiro)
          .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

        this.itemsApi.set(mapped);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.itemsApi.set([]);
        this.loading.set(false);
      },
    });
  }

  // ---------- helpers de normalização (mata string|undefined) ----------

  private normalizeType(raw: unknown): CareType {
    const t = String(raw ?? '').toUpperCase();
    if (t === 'VACINA') return 'VACINA';
    if (t === 'CONSULTA') return 'CONSULTA';
    if (t === 'VERMIFUGO') return 'VERMIFUGO';
    if (t === 'BANHO') return 'BANHO';
    if (t === 'TOSA') return 'TOSA';
    // se teu service não tiver OUTRO, troca pra 'CONSULTA' ou 'BANHO' etc
    return 'CONSULTA';
  }

  private pickDate(x: CuidadoApi): string {
    return x.data_cuidado ?? x.dataCuidado ?? x.data ?? x.date ?? '';
  }

  private getPetIdFromApi(x: CuidadoApi): number {
  const anyX = x as any;

  return Number(
    x.idPet ??
    x.id_pet ??
    x.petId ??
    anyX.pet?.id ??          // ✅ quando o back manda { pet: { id: ... } }
    anyX.pet?.petId ??       // (se vier diferente)
    0
  );
}
private getDateFromApi(x: CuidadoApi): string {
  const anyX = x as any;
  return (x.data_cuidado ?? x.dataCuidado ?? x.data ?? anyX.date ?? '') as string;
}


  private mapApiToCareItem(x: CuidadoApi): CareItem {
    const petId = this.getPetIdFromApi(x);
    const type = this.normalizeType(x.tipo);
    const date = this.pickDate(x);

    return {
      id: x.id,
      petId,
      type,
      date,
      cost: (x.custo ?? (x as any).valor ?? null) as number | null,
      description: x.descricao ?? '',
      icon: this.icon(type),
    };
  }
}
