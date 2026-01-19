import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pet-adopt',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule],
  templateUrl: './pet-adopt.html',
  styleUrl: './pet-adopt.scss',
})
export class PetAdopt {
  private route = inject(ActivatedRoute);
  id = Number(this.route.snapshot.paramMap.get('id'));
}
