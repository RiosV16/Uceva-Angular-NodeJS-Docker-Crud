
import { Routes } from '@angular/router';

import { ListStudents } from './modules/students/pages/list-students/list-students';
import { CreateStudent } from './modules/students/pages/create-student/create-student';
import { DetailStudent } from './modules/students/pages/detail-student/detail-student';
import { UpdateStudent } from './modules/students/pages/update-student/update-student';

import { ListProfessors } from './modules/professors/pages/list-professors/list-professors';
import { CreateProfessor } from './modules/professors/pages/create-professor/create-professor';
import { DetailProfessor } from './modules/professors/pages/detail-professor/detail-professor';
import { UpdateProfessor } from './modules/professors/pages/update-professor/update-professor';

export const routes: Routes = [
    { path: '', redirectTo: 'students', pathMatch: 'full' },

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
        path: 'professors',
        children: [
            { path: 'list', component: ListProfessors },
            { path: 'create', component: CreateProfessor },
            { path: 'update/:id', component: UpdateProfessor },
            { path: 'detail/:id', component: DetailProfessor },
            { path: '**', redirectTo: 'list' }
        ]
    }
];
