
import { Routes } from '@angular/router';

// ESTUDIANTES
import { ListStudents } from './modules/students/pages/list-students/list-students';
import { CreateStudent } from './modules/students/pages/create-student/create-student';
import { DetailStudent } from './modules/students/pages/detail-student/detail-student';
import { UpdateStudent } from './modules/students/pages/update-student/update-student';

// CURSOS
import { ListCourses } from './modules/courses/pages/list-courses/list-courses';
import { CreateCourse } from './modules/courses/pages/create-course/create-course';
import { DetailCourse } from './modules/courses/pages/detail-course/detail-course';
import { UpdateCourse } from './modules/courses/pages/update-course/update-course';

// PROFESORES
import { ListProfessors } from './modules/professors/pages/list-professors/list-professors';
import { CreateProfessor } from './modules/professors/pages/create-professor/create-professor';
import { DetailProfessor } from './modules/professors/pages/detail-professor/detail-professor';
import { UpdateProfessor } from './modules/professors/pages/update-professor/update-professor';

// SALONES
import { ListRooms } from './modules/rooms/pages/list-rooms/list-rooms';
import { CreateRoom } from './modules/rooms/pages/create-room/create-room';
import { DetailRoom } from './modules/rooms/pages/detail-room/detail-room';
import { UpdateRoom } from './modules/rooms/pages/update-room/update-room';

export const routes: Routes = [
  { path: '', redirectTo: 'students/list', pathMatch: 'full' },

  {
    path: 'students',
    children: [
      { path: 'list', component: ListStudents },
      { path: 'create', component: CreateStudent },
      { path: 'detail/:id', component: DetailStudent },
      { path: 'update/:id', component: UpdateStudent },
      { path: '**', redirectTo: 'list' }
    ]
  },

  {
    path: 'courses',
    children: [
      { path: 'list', component: ListCourses },
      { path: 'create', component: CreateCourse },
      { path: 'detail/:id', component: DetailCourse },
      { path: 'update/:id', component: UpdateCourse },
      { path: '**', redirectTo: 'list' }
    ]
  },

  {
    path: 'professors',
    children: [
      { path: 'list', component: ListProfessors },
      { path: 'create', component: CreateProfessor },
      { path: 'detail/:id', component: DetailProfessor },
      { path: 'update/:id', component: UpdateProfessor },
      { path: '**', redirectTo: 'list' }
    ]
  },

  {
    path: 'rooms',
    children: [
      { path: 'list', component: ListRooms },
      { path: 'create', component: CreateRoom },
      { path: 'detail/:id', component: DetailRoom },
      { path: 'update/:id', component: UpdateRoom },
      { path: '**', redirectTo: 'list' }
    ]
  }
];
