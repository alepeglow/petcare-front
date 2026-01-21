// src/app/core/services/pets.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';

export type PetApi = {
  id: number;
  nome: string;
  especie: string;
  status: string;
  raca?: string | null;
  idade?: number | null;
  data_entrada?: string | null;

  // <- ESSA é a chave que está vindo do banco/back
  id_tutor?: number | null;
};


@Injectable({ providedIn: 'root' })
export class PetsService {
  private http = inject(HttpClient);

  // listar todos
  getAll(): Observable<PetApi[]> {
    return this.http.get<PetApi[]>(`${API_BASE_URL}/pets`);
  }

  // ✅ alias (pra tua tela que chama listAll)
  listAll(): Observable<PetApi[]> {
    return this.getAll();
  }

  // ✅ listar adotados
  getAdotados(): Observable<PetApi[]> {
    return this.http.get<PetApi[]>(`${API_BASE_URL}/pets/adotados`);
  }

  // ✅ alias (pra tua tela que chama listAdotados)
  listAdotados(): Observable<PetApi[]> {
    return this.getAdotados();
  }

  // buscar por id
  getById(id: number): Observable<PetApi> {
    return this.http.get<PetApi>(`${API_BASE_URL}/pets/${id}`);
  }

  // criar
  create(payload: any): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/pets`, payload);
  }

  // atualizar
  update(payload: any): Observable<any> {
    return this.http.put<any>(`${API_BASE_URL}/pets`, payload);
  }

  // deletar
  delete(id: number): Observable<any> {
    return this.http.delete(`${API_BASE_URL}/pets/${id}`);
  }

  // adotar (usa tutorId na querystring)
  adotar(petId: number, tutorId: number): Observable<any> {
    return this.http.put(`${API_BASE_URL}/pets/${petId}/adotar?tutorId=${tutorId}`, {});
  }

  // devolver
  devolver(petId: number): Observable<any> {
    return this.http.put(`${API_BASE_URL}/pets/${petId}/devolver`, {});
  }
}
