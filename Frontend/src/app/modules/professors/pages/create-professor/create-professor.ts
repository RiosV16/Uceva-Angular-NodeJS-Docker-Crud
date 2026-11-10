
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ProfessorService } from '../../services/professor';
import { CreateProfessorRequest } from '../../interfaces/professor';

@Component({
  selector: 'app-create-professor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-professor.html'
})
export class CreateProfessor {

  private professorService = inject(ProfessorService);
  private router = inject(Router);

  professor: CreateProfessorRequest = {
    name: '',
    email: '',
    specialty: '',
    status: true
  };

  error = '';
  saving = false;

  save(): void {
    if (this.saving) return;

    this.saving = true;
    this.error = '';

    this.professorService.create(this.professor).subscribe({
      next: () => {
        this.router.navigate(['/professors/list']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al crear el profesor';
        this.saving = false;
      }
    });
  }
}
