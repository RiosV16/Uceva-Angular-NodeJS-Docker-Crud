import { Component, inject } from '@angular/core';
import { Course } from '../../interfaces/course';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Back } from '../../../shared/components/back/back';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-course',
  imports: [Back, CommonModule],
  templateUrl: './detail-course.html',
})
export class DetailCourse {

  course: Course | null = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  private alertService = inject(AlertService);

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getCourse(id);
  }

  getCourse(id: number){
    this.courseService.getById(id).subscribe({
      next: (course) => {
        this.course = course;
      },
      error: (error: any) => {
        console.error('Error fetching courses:', error);
        this.alertService.toast('Error al consultar el usuario', 'error');
        this.router.navigateByUrl('/courses');
      }
    })
  }

}
