import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';

export type CareType = 'VACINA' | 'CONSULTA' | 'VERMIFUGO' | 'BANHO' | 'TOSA';

export type CuidadoApi = {
  id: number;
  custo?: number | null;
  data_cuidado: string; // vindo do banco
  descricao?: string | null;
  tipo: CareType;
  id_pet: number;
};

@Injectable({ providedIn: 'root' })
export class CuidadosService {
  private readonly baseUrl = `${API_BASE_URL}/cuidados`;

  constructor(private http: HttpClient) {}

  getByPetId(petId: number): Observable<CuidadoApi[]> {
    return this.http.get<CuidadoApi[]>(`${this.baseUrl}/pet/${petId}`);
  }
}
