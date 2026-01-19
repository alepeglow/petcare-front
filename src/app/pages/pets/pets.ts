import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

type PetStatus = 'DISPONIVEL' | 'ADOTADO';
type Species = 'Cachorro' | 'Gato';

type Pet = {
  id: number;
  name: string;
  breed: string;
  age: string;
  gender: 'Macho' | 'Fêmea';
  size: 'P' | 'M' | 'G';
  species: Species;
  status: PetStatus;
  image: string;
  isFav: boolean;
};

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [
    CommonModule,

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
  pets = signal<Pet[]>([
    // === Dogs ===
    {
      id: 1,
      name: 'Thor',
      breed: 'Golden Retriever',
      age: '2 anos',
      gender: 'Macho',
      size: 'M',
      species: 'Cachorro',
      status: 'DISPONIVEL',
      image: '/assets/images/pets/dog-1.png',
      isFav: false,
    },
    {
      id: 2,
      name: 'Max',
      breed: 'Beagle',
      age: '6 meses',
      gender: 'Macho',
      size: 'P',
      species: 'Cachorro',
      status: 'ADOTADO',
      image: '/assets/images/pets/dog-2.png',
      isFav: true,
    },
    {
      id: 3,
      name: 'Mel',
      breed: 'Labrador',
      age: '3 anos',
      gender: 'Fêmea',
      size: 'G',
      species: 'Cachorro',
      status: 'DISPONIVEL',
      image: '/assets/images/pets/dog-3.svg',
      isFav: false,
    },
    {
      id: 4,
      name: 'Bob',
      breed: 'Shih Tzu',
      age: '1 ano',
      gender: 'Macho',
      size: 'P',
      species: 'Cachorro',
      status: 'DISPONIVEL',
      image: '/assets/images/pets/dog-4.svg',
      isFav: false,
    },
    {
      id: 5,
      name: 'Nina',
      breed: 'Border Collie',
      age: '4 anos',
      gender: 'Fêmea',
      size: 'M',
      species: 'Cachorro',
      status: 'ADOTADO',
      image: '/assets/images/pets/dog-5.svg',
      isFav: false,
    },
    {
      id: 6,
      name: 'Theo',
      breed: 'Vira-lata',
      age: '2 anos',
      gender: 'Macho',
      size: 'M',
      species: 'Cachorro',
      status: 'DISPONIVEL',
      image: '/assets/images/pets/dog-6.svg',
      isFav: true,
    },

    // === Cats ===
    {
      id: 7,
      name: 'Luna',
      breed: 'Gato Persa',
      age: '1 ano',
      gender: 'Fêmea',
      size: 'P',
      species: 'Gato',
      status: 'DISPONIVEL',
      image: '/assets/images/pets/cat-1.png',
      isFav: false,
    },
    {
      id: 8,
      name: 'Simba',
      breed: 'Maine Coon',
      age: '2 anos',
      gender: 'Macho',
      size: 'G',
      species: 'Gato',
      status: 'DISPONIVEL',
      image: '/assets/images/pets/cat-2.svg',
      isFav: false,
    },
    {
      id: 9,
      name: 'Mia',
      breed: 'Siamês',
      age: '1 ano',
      gender: 'Fêmea',
      size: 'P',
      species: 'Gato',
      status: 'ADOTADO',
      image: '/assets/images/pets/cat-3.svg',
      isFav: true,
    },
    {
      id: 10,
      name: 'Frida',
      breed: 'Angorá',
      age: '3 anos',
      gender: 'Fêmea',
      size: 'M',
      species: 'Gato',
      status: 'DISPONIVEL',
      image: '/assets/images/pets/cat-4.svg',
      isFav: false,
    },
    {
      id: 11,
      name: 'Oliver',
      breed: 'SRD',
      age: '8 meses',
      gender: 'Macho',
      size: 'P',
      species: 'Gato',
      status: 'DISPONIVEL',
      image: '/assets/images/pets/cat-5.svg',
      isFav: false,
    },
    {
      id: 12,
      name: 'Amora',
      breed: 'Ragdoll',
      age: '2 anos',
      gender: 'Fêmea',
      size: 'M',
      species: 'Gato',
      status: 'ADOTADO',
      image: '/assets/images/pets/cat-6.svg',
      isFav: false,
    },
  ]);

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
