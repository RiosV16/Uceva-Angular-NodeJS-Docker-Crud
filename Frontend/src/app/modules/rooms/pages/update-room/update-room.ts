
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { RoomService } from '../../services/room';
import { UpdateRoomRequest } from '../../interfaces/room';

@Component({
  selector: 'app-update-room',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './update-room.html'
})
export class UpdateRoom implements OnInit {

  private roomService = inject(RoomService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id = 0;
  loading = true;
  saving = false;
  error = '';

  room: UpdateRoomRequest = {
    code: '',
    building: '',
    capacity: 1,
    available: true
  };

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isSafeInteger(this.id) || this.id <= 0) {
      this.error = 'ID de salón inválido';
      this.loading = false;
      return;
    }

    this.roomService.getById(this.id).subscribe({
      next: data => {
        this.room = {
          code: data.code,
          building: data.building,
          capacity: data.capacity,
          available: data.available
        };
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el salón';
        this.loading = false;
      }
    });
  }

  save(): void {
    if (this.saving || this.loading) return;

    this.saving = true;
    this.error = '';

    this.roomService.update(this.id, this.room).subscribe({
      next: () => {
        this.router.navigate(['/rooms/list']);
      },
      error: err => {
        const detail = err.error?.error;
        this.error = typeof detail === 'string'
          ? detail
          : 'No se pudo actualizar el salón';
        this.saving = false;
      }
    });
  }
}
