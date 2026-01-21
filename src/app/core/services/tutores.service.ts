// src/app/core/services/tutores.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';

export interface TutorApi {
  id: number;
  nome: string;       // ✅ é "nome" no teu banco
  telefone?: string;
  email?: string;
  endereco?: string;
}

@Injectable({ providedIn: 'root' })
export class TutoresService {
  private http = inject(HttpClient);

  getAll(): Observable<TutorApi[]> {
    return this.http.get<TutorApi[]>(`${API_BASE_URL}/tutores`);
  }

  // ✅ alias (pra tua tela que chama listAll)
  listAll(): Observable<TutorApi[]> {
    return this.getAll();
  }
}
