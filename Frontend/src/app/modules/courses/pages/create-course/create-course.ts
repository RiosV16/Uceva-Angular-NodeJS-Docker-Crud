import { Component, inject } from '@angular/core';
import { Back } from '../../../shared/components/back/back';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { CreateCourseRequest } from '../../interfaces/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-create-course',
  imports: [
    Back, 
    ReactiveFormsModule
  ],
  templateUrl: './create-course.html',
})
export class CreateCourse {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private courseService = inject(CourseService);

  semesters = Array.from({ length: 10 }, (_, i) => i + 1);

  courseForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    credits: ['', Validators.required],
    semester: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
    status: [true]
  });

  createCourse(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }
    const course: CreateCourseRequest = {
      name: this.courseForm.value.name!,
      description: this.courseForm.value.description!,
      credits: Number(this.courseForm.value.credits),
      semester: Number(this.courseForm.value.semester),
      status: this.courseForm.value.status!
    };
    console.log('Curso para enviar al backend:', course);
    this.courseService.create(course).subscribe({
      next: () => {
        this.alertService.toast(
          'Curso registrado correctamente',
          'success'
        );
        this.router.navigateByUrl('/courses');
      },
      error: () => {
        this.alertService.toast('Error al crear el curso', 'error');
      }
    })

  }
}
