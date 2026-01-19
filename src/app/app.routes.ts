import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';
import { Dashboard } from './pages/dashboard/dashboard';
import { Pets } from './pages/pets/pets';
import { Tutores } from './pages/tutores/tutores';
import { Cuidados } from './pages/cuidados/cuidados';
import { Adocoes } from './pages/adocoes/adocoes';
import { PetDetails } from './pages/pet-details/pet-details';
import { PetAdopt } from './pages/pet-adopt/pet-adopt';


export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: Dashboard },
      { path: 'pets', component: Pets },
      { path: 'pets/:id', component: PetDetails },
      { path: 'pets/:id/adotar', component: PetAdopt },
      { path: 'tutores', component: Tutores },
      { path: 'cuidados', component: Cuidados },
      { path: 'adocoes', component: Adocoes },

    ],
  },
];
