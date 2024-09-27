import { Component, signal, inject } from '@angular/core';
import { AuditsService } from '../../services/audit.service';
import { AuditInterface } from '../../interfaces/audit.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export default class HistoryComponent {
  audits = signal<AuditInterface[]>([]);  // Signal para almacenar la lista de auditorías

  private auditsService = inject(AuditsService);

  constructor() {
    this.loadAudits();  // Cargar auditorías al iniciar el componente
  }

  loadAudits() {
    this.auditsService.getAudits().subscribe({
      next: (auditList) => {
        this.audits.set(auditList);  // Guardar auditorías en la signal
      },
      error: (error) => {
        console.error('Error loading audits:', error);
      }
    });
  }
}
