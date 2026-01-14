import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { PetsComponent } from './pages/pets/pets';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'pets', component: PetsComponent },
      // depois: adocoes, adotantes, agendamentos...
    ],
  },
];

