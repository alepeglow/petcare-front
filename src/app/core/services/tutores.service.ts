import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../api.config';

export type TutorApi = {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
};

@Injectable({ providedIn: 'root' })
export class TutoresService {
  private http = inject(HttpClient);

  list(): Observable<TutorApi[]> {
    return this.http.get<TutorApi[]>(`${API_BASE_URL}/tutores`);
  }
}
