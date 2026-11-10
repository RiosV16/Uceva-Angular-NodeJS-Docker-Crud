import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CreateCourseRequest, UpdateCourseRequest } from '../interfaces/course';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  private http = inject(HttpClient);
  url = 'http://localhost:3000/api/courses';

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }

  getById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.url}/${id}`);
  }

  create(student: CreateCourseRequest): Observable<Course> {
    return this.http.post<Course>(this.url, student);
  }

  update(id: number, student: UpdateCourseRequest): Observable<Course> {
    return this.http.put<Course>(`${this.url}/${id}`, student);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
