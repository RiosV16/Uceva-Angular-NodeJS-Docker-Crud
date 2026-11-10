
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { RoomService } from '../../services/room';
import { CreateRoomRequest } from '../../interfaces/room';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-room.html'
})
export class CreateRoom {

  private roomService = inject(RoomService);
  private router = inject(Router);

  room: CreateRoomRequest = {
    code: '',
    building: '',
    capacity: 1,
    available: true
  };

  error = '';
  saving = false;

  save(): void {
    if (this.saving) return;

    this.saving = true;
    this.error = '';

    this.roomService.create(this.room).subscribe({
      next: () => {
        this.router.navigate(['/rooms/list']);
      },
      error: (err) => {
        const detail = err.error?.error;
        this.error = typeof detail === 'string'
          ? detail
          : 'No se pudo registrar el salón';
        this.saving = false;
      }
    });
  }
}
