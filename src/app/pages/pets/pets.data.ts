// src/app/pet/pets.data.ts

export type PetStatus = 'DISPONIVEL' | 'ADOTADO';
export type Species = 'Cachorro' | 'Gato';

export type Pet = {
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

  // 👇 novos campos pro Pet Details
  entryDate: string; // "15/01/2025"
  weightKg: number; // 28
  color: string; // "Dourado"
  traits: string[]; // ["Dócil", "Brincalhão", ...]
};

export const PETS: Pet[] = [
  // DOGS (dog-1..dog-6)
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

    entryDate: '15/01/2025',
    weightKg: 28,
    color: 'Dourado',
    traits: ['Dócil', 'Brincalhão', 'Vacinado', 'Castrado'],
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
    entryDate: '15/01/2025',
    weightKg: 28,
    color: 'Dourado',
    traits: ['Dócil', 'Brincalhão', 'Vacinado', 'Castrado'],
  },
  {
    id: 3,
    name: 'Bob',
    breed: 'Labrador',
    age: '3 anos',
    gender: 'Macho',
    size: 'G',
    species: 'Cachorro',
    status: 'DISPONIVEL',
    image: '/assets/images/pets/dog-3.png',
    isFav: false,
    entryDate: '20/10/2024',
    weightKg: 33,
    color: 'Dourado',
    traits: ['Carinhoso', 'Ativo', 'Vacinado', 'Castrado'],
  },
  {
    id: 4,
    name: 'Mel',
    breed: 'Shih Tzu',
    age: '1 ano',
    gender: 'Fêmea',
    size: 'P',
    species: 'Cachorro',
    status: 'DISPONIVEL',
    image: '/assets/images/pets/dog-4.png',
    isFav: false,
    entryDate: '08/02/2025',
    weightKg: 6,
    color: 'Branco e Caramelo',
    traits: ['Calma', 'Carinhosa', 'Vacinada', 'Castrada'],
  },
  {
    id: 5,
    name: 'Loki',
    breed: 'Border Collie',
    age: '4 anos',
    gender: 'Macho',
    size: 'M',
    species: 'Cachorro',
    status: 'DISPONIVEL',
    image: '/assets/images/pets/dog-5.png',
    isFav: false,
    entryDate: '12/12/2024',
    weightKg: 19,
    color: 'Preto e Branco',
    traits: ['Inteligente', 'Treinado', 'Vacinado', 'Castrado'],
  },
  {
    id: 6,
    name: 'Nina',
    breed: 'Vira-lata (SRD)',
    age: '2 anos',
    gender: 'Fêmea',
    size: 'M',
    species: 'Cachorro',
    status: 'ADOTADO',
    image: '/assets/images/pets/dog-6.png',
    isFav: false,
    entryDate: '25/09/2024',
    weightKg: 16,
    color: 'Caramelo',
    traits: ['Carinhosa', 'Sociável', 'Vacinada', 'Castrada'],
  },

  // CATS (cat-1..cat-6)
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
    entryDate: '05/01/2025',
    weightKg: 4,
    color: 'Branco',
    traits: ['Calma', 'Carinhosa', 'Vacinada', 'Castrada'],
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
    image: '/assets/images/pets/cat-2.png',
    isFav: false,
    entryDate: '18/08/2024',
    weightKg: 8,
    color: 'Cinza Rajado',
    traits: ['Tranquilo', 'Sociável', 'Vacinado', 'Castrado'],
  },
  {
    id: 9,
    name: 'Mia',
    breed: 'Siamês',
    age: '1 ano',
    gender: 'Fêmea',
    size: 'P',
    species: 'Gato',
    status: 'DISPONIVEL',
    image: '/assets/images/pets/cat-3.png',
    isFav: true,
    entryDate: '22/02/2025',
    weightKg: 3,
    color: 'Creme e Marrom',
    traits: ['Curiosa', 'Falante', 'Vacinada', 'Castrada'],
  },
  {
    id: 10,
    name: 'Snow',
    breed: 'Angorá',
    age: '3 anos',
    gender: 'Macho',
    size: 'M',
    species: 'Gato',
    status: 'DISPONIVEL',
    image: '/assets/images/pets/cat-4.png',
    isFav: false,
    entryDate: '10/07/2024',
    weightKg: 5,
    color: 'Branco',
    traits: ['Elegante', 'Calmo', 'Vacinado', 'Castrado'],
  },
  {
    id: 11,
    name: 'Pipoca',
    breed: 'Gato SRD',
    age: '8 meses',
    gender: 'Fêmea',
    size: 'P',
    species: 'Gato',
    status: 'ADOTADO',
    image: '/assets/images/pets/cat-5.png',
    isFav: false,
    entryDate: '14/03/2025',
    weightKg: 3,
    color: 'Preto e Branco',
    traits: ['Brincalhona', 'Curiosa', 'Vacinada', 'Sociável'],
  },
  {
    id: 12,
    name: 'Theo',
    breed: 'Ragdoll',
    age: '2 anos',
    gender: 'Macho',
    size: 'M',
    species: 'Gato',
    status: 'DISPONIVEL',
    image: '/assets/images/pets/cat-6.png',
    isFav: false,
    entryDate: '29/10/2024',
    weightKg: 6,
    color: 'Creme e Cinza',
    traits: ['Dócil', 'Carinhoso', 'Vacinado', 'Castrado'],
  },
];

export function getPetById(id: number): Pet | undefined {
  return PETS.find((p) => p.id === id);
}
