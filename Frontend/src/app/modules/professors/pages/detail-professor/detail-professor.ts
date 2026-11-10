
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProfessorService } from '../../services/professor';
import { Professor } from '../../interfaces/professor';

@Component({
  selector: 'app-detail-professor',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-professor.html'
})
export class DetailProfessor implements OnInit {
  private service = inject(ProfessorService);
  private route = inject(ActivatedRoute);

  professor: Professor | null = null;
  error = '';
  loading = true;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isSafeInteger(id) || id <= 0) {
      this.error = 'ID de profesor inválido';
      this.loading = false;
      return;
    }

    this.service.getById(id).subscribe({
      next: data => {
        this.professor = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo consultar el profesor';
        this.loading = false;
      }
    });
  }
}
