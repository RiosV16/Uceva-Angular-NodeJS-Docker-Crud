
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Room,
  CreateRoomRequest,
  UpdateRoomRequest
} from '../interfaces/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private http = inject(HttpClient);

  private url = 'http://localhost:3000/api/rooms';

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(this.url);
  }

  getById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.url}/${id}`);
  }

  create(room: CreateRoomRequest): Observable<Room> {
    return this.http.post<Room>(this.url, room);
  }

  update(id: number, room: UpdateRoomRequest): Observable<Room> {
    return this.http.put<Room>(`${this.url}/${id}`, room);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.url}/${id}`
    );
  }
}
