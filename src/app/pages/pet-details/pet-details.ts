import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './pet-details.html',
  styleUrl: './pet-details.scss',
})
export class PetDetails {
  private route = inject(ActivatedRoute);
  id = Number(this.route.snapshot.paramMap.get('id'));
}
