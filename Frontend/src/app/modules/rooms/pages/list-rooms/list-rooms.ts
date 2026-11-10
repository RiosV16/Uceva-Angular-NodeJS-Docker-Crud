
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { RoomService } from '../../services/room';
import { Room } from '../../interfaces/room';

@Component({
  selector: 'app-list-rooms',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-rooms.html'
})
export class ListRooms implements OnInit {

  private roomService = inject(RoomService);

  rooms: Room[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.loading = true;
    this.error = '';

    this.roomService.getAll().subscribe({
      next: data => {
        this.rooms = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los salones';
        this.loading = false;
      }
    });
  }

  deleteRoom(id: number): void {
    if (!confirm('¿Eliminar este salón?')) return;

    this.roomService.delete(id).subscribe({
      next: () => this.loadRooms(),
      error: () => {
        this.error = 'No se pudo eliminar el salón';
      }
    });
  }
}
