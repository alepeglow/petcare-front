import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';

export type CareType = 'VACINA' | 'CONSULTA' | 'VERMIFUGO' | 'BANHO' | 'TOSA' | 'OUTRO';

export type CuidadoApi = {
  id: number;

  // id do pet pode vir com nomes diferentes
  id_pet?: number;
  idPet?: number;
  petId?: number;

  tipo?: CareType | string;

  // data pode vir com nomes diferentes
  data_cuidado?: string;
  dataCuidado?: string;
  data?: string;
  date?: string;

  descricao?: string;

  // se o back tiver custo/valor
  custo?: number;
  valor?: number;
};

@Injectable({ providedIn: 'root' })
export class CuidadosService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${API_BASE_URL}/cuidados`;

  list(): Observable<CuidadoApi[]> {
    return this.http.get<CuidadoApi[]>(this.baseUrl);
  }

  // ✅ alias pro teu código antigo não quebrar
  listAll(): Observable<CuidadoApi[]> {
    return this.list();
  }

  getByPetId(petId: number): Observable<CuidadoApi[]> {
    return this.http.get<CuidadoApi[]>(`${this.baseUrl}/pet/${petId}`);
  }

  create(payload: any): Observable<CuidadoApi> {
    return this.http.post<CuidadoApi>(this.baseUrl, payload);
  }
}

