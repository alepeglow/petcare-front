import { CommonModule } from '@angular/common';
import { PETS, Pet,Species } from '../pets/pets.data';

import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';





@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  templateUrl: './pets.html',
  styleUrl: './pets.scss',
})
export class Pets {
  private route = inject(ActivatedRoute);

  onSearchInput(ev: Event) {
    const value = (ev.target as HTMLInputElement).value ?? '';
    this.search.set(value);
  }

  // ✅ UI state (signals)
  search = signal('');
  species = signal<'ALL' | Species>('ALL');

  statusTab = signal<'todos' | 'disponiveis' | 'adotados'>('todos');
  viewMode = signal<'grid' | 'list'>('grid');

  // ✅ paginação
  pageSize = signal(9);
  pageIndex = signal(0);

  // ✅ dados mock (depois troca pelo back)
 pets = signal<Pet[]>(PETS);


  // ✅ counts
  availableCount = computed(() => this.pets().filter(p => p.status === 'DISPONIVEL').length);
  adoptedCount = computed(() => this.pets().filter(p => p.status === 'ADOTADO').length);

  // ✅ filtrado (100% reativo)
  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const sp = this.species();
    const tab = this.statusTab();

    let list = this.pets();

    if (tab === 'disponiveis') list = list.filter(p => p.status === 'DISPONIVEL');
    if (tab === 'adotados') list = list.filter(p => p.status === 'ADOTADO');

    if (sp !== 'ALL') list = list.filter(p => p.species === sp);

    if (q) {
      list = list.filter(p => (p.name + ' ' + p.breed).toLowerCase().includes(q));
    }

    return list;
  });

  resultsCount = computed(() => this.filtered().length);

  // ✅ paginação aplicada no filtrado
  paged = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.filtered().slice(start, end);
  });

  constructor() {
    // ✅ lê query param: /pets?status=disponiveis
    this.route.queryParamMap.subscribe(qp => {
      const status = qp.get('status');
      if (status === 'disponiveis') this.statusTab.set('disponiveis');
      else if (status === 'adotados') this.statusTab.set('adotados');
      else if (status === 'todos') this.statusTab.set('todos');
    });

    // ✅ quando muda filtros, volta pra página 0
    effect(() => {
      this.search();
      this.species();
      this.statusTab();
      this.pageIndex.set(0);
    });
  }

  setTab(idx: number) {
    if (idx === 0) this.statusTab.set('todos');
    if (idx === 1) this.statusTab.set('disponiveis');
    if (idx === 2) this.statusTab.set('adotados');
  }

  onPage(ev: PageEvent) {
    this.pageIndex.set(ev.pageIndex);
    this.pageSize.set(ev.pageSize);
  }

  toggleFav(id: number) {
    this.pets.update(list => list.map(p => (p.id === id ? { ...p, isFav: !p.isFav } : p)));
  }

  adopt(id: number) {
    this.pets.update(list =>
      list.map(p => (p.id === id && p.status === 'DISPONIVEL' ? { ...p, status: 'ADOTADO' } : p))
    );
  }
}
