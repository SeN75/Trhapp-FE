import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tp-mina-floors',
  standalone: true,
  imports: [],
  templateUrl: './mina-floors.component.html',
  styleUrl: './mina-floors.component.scss',
})
export class MinaFloorsComponent {
  private aRouter = inject(ActivatedRoute);
}
