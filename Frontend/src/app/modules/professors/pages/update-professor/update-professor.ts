
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfessorService } from '../../services/professor';
import { UpdateProfessorRequest } from '../../interfaces/professor';

@Component({
  selector: 'app-update-professor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './update-professor.html'
})
export class UpdateProfessor implements OnInit {

  private service = inject(ProfessorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id = 0;
  professor: UpdateProfessorRequest = {
    name: '',
    email: '',
    specialty: '',
    status: true
  };

  error = '';
  loading = true;
  saving = false;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isSafeInteger(this.id) || this.id <= 0) {
      this.error = 'ID de profesor inválido';
      this.loading = false;
      return;
    }

    this.service.getById(this.id).subscribe({
      next: data => {
        this.professor = {
          name: data.name,
          email: data.email,
          specialty: data.specialty,
          status: data.status
        };
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el profesor';
        this.loading = false;
      }
    });
  }

  save(): void {
    if (this.saving || this.loading) return;

    this.saving = true;
    this.error = '';

    this.service.update(this.id, this.professor).subscribe({
      next: () => {
        this.router.navigate(['/professors/list']);
      },
      error: err => {
        this.error = err.error?.error || 'No se pudo actualizar';
        this.saving = false;
      }
    });
  }
}
