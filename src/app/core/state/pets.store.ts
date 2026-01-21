import { Injectable, signal } from '@angular/core';
import { PETS, type Pet } from '../../pages/pets/pets.data';

@Injectable({ providedIn: 'root' })
export class PetsStore {
  // começa com o mock, mas vira a fonte única do app
  pets = signal<Pet[]>(PETS);

  getById(id: number): Pet | undefined {
    return this.pets().find(p => p.id === id);
  }

  setStatus(id: number, status: Pet['status']) {
    this.pets.update(list => list.map(p => (p.id === id ? { ...p, status } : p)));
  }
}
