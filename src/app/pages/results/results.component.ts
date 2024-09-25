import { Component, signal, inject } from '@angular/core';
import { AuditInterface } from '../../interfaces/audit.interface';
import { AuditsService } from '../../services/audit.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [FormsModule], // Asegúrate de importar FormsModule
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export default class ResultsComponent {
  url = signal(''); // Usamos signal para el estado de la URL
  auditResult = signal<AuditInterface>({} as AuditInterface);  // Signal para el resultado de la auditoría

  // Inyección de AuditsService usando inject
  private auditsService = inject(AuditsService);

  onSubmit() {
    this.auditsService.auditUrl(this.url()).subscribe({
      next: (result) => {
        this.auditResult.set(result); // Actualiza el resultado de la auditoría
        console.log('Audit result:', this.auditResult()); // Accede al valor de la signal
      },
      error: (error) => {
        console.error('Error during audit:', error);
      }
    });
  }
}
