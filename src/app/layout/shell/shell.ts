import { Component,ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';


type NavItem = {
  label: string;
  icon: string;
  path: string;
};

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,

    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatTooltipModule,

  ],
  templateUrl: './shell.html',
  styleUrls: ['./shell.scss'],
})
export class Shell {
  @ViewChild('pageScroll') pageScroll!: ElementRef<HTMLElement>;

  onDrawerChange(opened: boolean) {
    // Quando a sidebar for aberta ou fechada, rola a página para o topo
    queueMicrotask(() => {});
    this.pageScroll.nativeElement.scrollTop = 0;
  }
  navItems: NavItem[] = [
    { label: 'Home', icon: 'home', path: '/dashboard' },
    { label: 'Pets', icon: 'pets', path: '/pets' },
    { label: 'Tutores', icon: 'groups', path: '/tutores' },
    { label: 'Cuidados', icon: 'medical_services', path: '/cuidados' },
    { label: 'Adoções', icon: 'handshake', path: '/adocoes' },
  ];
}
