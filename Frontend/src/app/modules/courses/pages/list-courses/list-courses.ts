import { Component, inject } from '@angular/core';
import { Course } from '../../interfaces/course';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { Button } from '../../../shared/components/button/button';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { CourseService } from '../../services/course.service';
import { TableCourses } from '../../components/table-courses/table-courses';
import { TableCoursesEvents } from '../../interfaces/table-courses';

@Component({
  selector: 'app-list-courses',
  imports: [
    Button,
    TableCourses
  ],
  templateUrl: './list-courses.html',
  styleUrl: './list-courses.scss',
})
export class ListCourses {

  courses: Course[] = [];

  private router = inject(Router);
  private courseService = inject(CourseService);
  private alertService = inject(AlertService);
  
  createButtonConfig: ButtonConfig = {
    id: 'create-course-button',
    title: 'Create Course',
    type: 'primary',
    outline: true,
    icon: 'plus-circle'
  };

  ngOnInit(){
    this.getCourses();
  }

  getCourses(){
    this.courseService.getAll().subscribe({
      next: (courses: Course[]) => {
        this.courses = courses;
      },
      error: (error: any) => {
        console.error('Error fetching courses:', error);
        this.alertService.toast('Error al consultar los estudiantes', 'error');
      }
    });
  }

  createCourse(){
    this.router.navigateByUrl('/courses/create');
  }

  tableEvents({ id, action }: TableCoursesEvents){
    switch(action){
      case 'detail':
        this.viewDetail(id);
        break;
      case 'edit':
        this.update(id);
        break;
      case 'delete':
        this.delete(id);
        break;
    }
  }

  viewDetail(id: number){
    this.router.navigateByUrl(`/courses/detail/${id}`);
  }

  update(id: number){
    this.router.navigateByUrl(`/courses/update/${id}`);
  }

  async delete(id: number){
    const title = '¿Esta seguro?';
    const text = `Se va eliminar el estudiante ${id}`;
    const confirm = await this.alertService.confirm(title, text);
    if(confirm){
      this.courseService.delete(id).subscribe({
        next: () => {
          this.alertService.toast('Eliminación Exitosa', 'success');
          this.getCourses();
        },
        error: () => {
          this.alertService.toast('Error al eliminar el curso', 'error');
        }
      });
    }

  }

}
