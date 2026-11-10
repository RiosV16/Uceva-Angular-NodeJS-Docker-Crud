
import { Routes } from '@angular/router';

import { ListStudents } from './modules/students/pages/list-students/list-students';
import { CreateStudent } from './modules/students/pages/create-student/create-student';
import { DetailStudent } from './modules/students/pages/detail-student/detail-student';
import { UpdateStudent } from './modules/students/pages/update-student/update-student';

import { ListRooms } from './modules/rooms/pages/list-rooms/list-rooms';
import { CreateRoom } from './modules/rooms/pages/create-room/create-room';
import { DetailRoom } from './modules/rooms/pages/detail-room/detail-room';
import { UpdateRoom } from './modules/rooms/pages/update-room/update-room';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'students/list',
    pathMatch: 'full'
  },
  {
    path: 'students',
    children: [
      { path: 'list', component: ListStudents },
      { path: 'create', component: CreateStudent },
      { path: 'update/:id', component: UpdateStudent },
      { path: 'detail/:id', component: DetailStudent },
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
