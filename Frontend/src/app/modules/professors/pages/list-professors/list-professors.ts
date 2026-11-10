
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProfessorService } from '../../services/professor';
import { Professor } from '../../interfaces/professor';

@Component({
  selector: 'app-list-professors',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-professors.html'
})
export class ListProfessors implements OnInit {

  private professorService = inject(ProfessorService);

  professors: Professor[] = [];
  error = '';
  loading = true;

  ngOnInit(): void {
    this.loadProfessors();
  }

  loadProfessors(): void {
    this.loading = true;
    this.error = '';

    this.professorService.getAll().subscribe({
      next: (data) => {
        this.professors = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los profesores';
        this.loading = false;
      }
    });
  }

  deleteProfessor(id: number): void {
    if (!confirm('¿Eliminar este profesor?')) return;

    this.professorService.delete(id).subscribe({
      next: () => this.loadProfessors(),
      error: () => {
        this.error = 'No se pudo eliminar el profesor';
      }
    });
  }
}
