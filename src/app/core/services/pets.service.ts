// src/app/core/services/pets.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';

@Injectable({ providedIn: 'root' })
export class PetsService {
  private http = inject(HttpClient);

  // listar
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE_URL}/pets`);
  }

  // buscar por id
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${API_BASE_URL}/pets/${id}`);
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
