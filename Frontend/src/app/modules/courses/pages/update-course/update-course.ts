import { Component, inject } from '@angular/core';
import { Back } from '../../../shared/components/back/back';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { CourseService } from '../../services/course.service';
import { Course, UpdateCourseRequest } from '../../interfaces/course';

@Component({
  selector: 'app-update-course',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './update-course.html',
  styleUrl: './update-course.scss',
})
export class UpdateCourse {

  id!: number;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
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

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = Number(paramId);
    if (!paramId || !Number.isFinite(this.id) || this.id <= 0) {
      this.alertService.toast('Id no válida', 'error');
      this.goToList();
      return;
    }
    this.getCourse();
  }

  getCourse() {
    this.courseService.getById(this.id).subscribe({
      next: (course) => {
        this.setValues(course);
      },
      error: (error: any) => {
        console.error('Error fetching courses:', error);
        this.alertService.toast('Error al consultar el curso', 'error');
        this.goToList();
      }
    })
  }

  setValues(course: Course): void {
    this.courseForm.patchValue({
      name: course.name,
      description: course.description,
      credits: String(course.credits),
      semester: String(course.semester),
      status: course.status
    });
  }

  updateCourse(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }
    const formValue = this.courseForm.getRawValue();
    const course: UpdateCourseRequest = {
      name: formValue.name!,
      description: formValue.description!,
      credits: Number(formValue.credits),
      semester: Number(formValue.semester),
      status: formValue.status!
    };

    this.courseService.update(this.id, course).subscribe({
      next: () => {
        this.alertService.toast(
          'Estudiante actualizado correctamente',
          'success'
        );
        this.goToList();
      },
      error: (error: any) => {
        console.error('Error updating course:', error);
        this.alertService.toast(
          'Error al actualizar el curso',
          'error'
        );
      }
    });
  }

  goToList() {
    this.router.navigateByUrl('courses');
  }

}
