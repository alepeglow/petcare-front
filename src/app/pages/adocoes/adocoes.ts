// src/app/pages/adocoes/adocoes.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { PetsService } from '../../core/services/pets.service';

type PetStatus = 'DISPONIVEL' | 'ADOTADO' | 'INATIVO' | 'ENCERRADO' | string;

export interface PetApi {
  id: number;
  nome: string;
  especie?: string;
  raca?: string;
  status?: PetStatus;

  // campos possíveis vindos do backend (varia conforme teu modelo)
  id_tutor?: number | null;
  tutorId?: number | null;
  idTutor?: number | null;

  tutor?: { id?: number; nome?: string } | null;

  // campos já “prontos” às vezes vêm assim
  tutorNome?: string | null;
  nomeTutor?: string | null;

  // extras (se vierem, ótimo)
  data_entrada?: string;
  dataEntrada?: string;
}

export interface AdoptionRow {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  status: PetStatus;
  tutorId: number | null;
  tutorNome: string;
  raw: PetApi;
}

@Component({
  selector: 'app-adocoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adocoes.html',
  styleUrls: ['./adocoes.scss'],
})
export class AdocoesPage implements OnInit {
  private pets = inject(PetsService);
  private router = inject(Router);

  loading = false;
  errorMsg: string | null = null;

  q = '';
  items: AdoptionRow[] = [];
  filtered: AdoptionRow[] = [];

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.loading = true;
    this.errorMsg = null;

    // tenta usar endpoint específico /pets/adotados se existir no PetsService
    const petsAny = this.pets as any;

    const obs =
      typeof petsAny.getAdotados === 'function'
        ? petsAny.getAdotados()
        : typeof petsAny.listAdotados === 'function'
          ? petsAny.listAdotados()
          : this.pets.getAll();

    obs
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data: PetApi[]) => {
          const raw = Array.isArray(data) ? data : [];

          // fallback: se não veio do /adotados, filtra por status aqui
          const adotados = raw.filter((p) => String(p?.status ?? '').toUpperCase() === 'ADOTADO');

          const base = (typeof petsAny.getAdotados === 'function' || typeof petsAny.listAdotados === 'function')
            ? raw
            : adotados;

          this.items = base
            .map((p) => this.mapToRow(p))
            .sort((a, b) => a.nome.localeCompare(b.nome));

          this.applyFilter();
        },
        error: (err: unknown) => {
          console.error(err);
          this.items = [];
          this.filtered = [];
          this.errorMsg = 'Não foi possível carregar as adoções.';
        },
      });
  }

  applyFilter(): void {
    const term = (this.q ?? '').trim().toLowerCase();

    if (!term) {
      this.filtered = [...this.items];
      return;
    }

    this.filtered = this.items.filter((x) => {
      const hay = `${x.nome} ${x.raca} ${x.especie} ${x.tutorNome}`.toLowerCase();
      return hay.includes(term);
    });
  }

  verDetalhes(p: AdoptionRow): void {
    // Ajusta aqui se tua rota de detalhes for diferente.
    // Ex.: /pets/1, /pets/detalhes/1, etc.
    this.router.navigate(['/pets', p.id]);
  }

  devolver(p: AdoptionRow): void {
    if (!p?.id) return;

    const ok = confirm(`Confirmar devolução do pet "${p.nome}"?`);
    if (!ok) return;

    this.loading = true;
    this.errorMsg = null;

    this.pets
      .devolver(p.id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          // recarrega lista já atualizada do backend
          this.reload();
        },
        error: (err: unknown) => {
          console.error(err);
          this.errorMsg = 'Não foi possível devolver o pet.';
        },
      });
  }

  private mapToRow(p: PetApi): AdoptionRow {
    const especie = (p.especie ?? '').trim() || '—';
    const raca = (p.raca ?? '').trim() || '—';
    const status = (p.status ?? 'ADOTADO') as PetStatus;

    const tutorId =
      (p.id_tutor ?? null) ??
      (p.tutorId ?? null) ??
      (p.idTutor ?? null) ??
      (p.tutor?.id ?? null) ??
      null;

    const tutorNome =
      (p.tutor?.nome ?? null) ??
      (p.tutorNome ?? null) ??
      (p.nomeTutor ?? null) ??
      '—';

    return {
      id: p.id,
      nome: p.nome,
      especie,
      raca,
      status,
      tutorId,
      tutorNome: (tutorNome ?? '—') || '—',
      raw: p,
    };
  }
}
