import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TutoresService, type TutorApi } from '../../core/services/tutores.service';

@Component({
  selector: 'app-tutores',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './tutores.html',
  styleUrl: './tutores.scss',
})
export class Tutores {
  private tutoresService = inject(TutoresService);

  loading = signal(false);
  error = signal(false);

  search = signal('');
  tutores = signal<TutorApi[]>([]);

  // ✅ existe agora (o HTML usa isso)
  onSearchInput(ev: Event) {
    const value = (ev.target as HTMLInputElement).value ?? '';
    this.search.set(value);
  }

  // ✅ existe agora (o HTML usa isso)
  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const list = this.tutores();

    if (!q) return list;

    return list.filter((t) => {
      const text = `${t.nome} ${t.telefone} ${t.email} ${t.endereco}`.toLowerCase();
      return text.includes(q);
    });
  });

  total = computed(() => this.filtered().length);

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.loading.set(true);
    this.error.set(false);

    this.tutoresService.list().subscribe({
      next: (list) => {
        this.tutores.set(list ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  // ✅ existe agora (o HTML usa trackById)
  trackById(_: number, item: TutorApi) {
    return item.id;
  }
}
