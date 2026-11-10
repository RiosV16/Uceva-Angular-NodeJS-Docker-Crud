
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { RoomService } from '../../services/room';
import { Room } from '../../interfaces/room';

@Component({
  selector: 'app-detail-room',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-room.html'
})
export class DetailRoom implements OnInit {

  private roomService = inject(RoomService);
  private route = inject(ActivatedRoute);

  room: Room | null = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isSafeInteger(id) || id <= 0) {
      this.error = 'ID de salón inválido';
      this.loading = false;
      return;
    }

    this.roomService.getById(id).subscribe({
      next: data => {
        this.room = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo consultar el salón';
        this.loading = false;
      }
    });
  }
}
