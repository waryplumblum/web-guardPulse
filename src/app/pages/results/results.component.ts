import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditInterface, AuditResultDetails, AuditApiResponse  } from '../../interfaces/audit.interface';
import { AuditsService } from '../../services/audit.service';

import { UrlFormComponent } from '../../shared/url-form/url-form.component';
import { AuditResultComponent } from '../../shared/audit-results/audit-results.component';


@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule,UrlFormComponent,AuditResultComponent],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export default class ResultsComponent {
  auditResult = signal<AuditResultDetails>({} as AuditResultDetails);  // Signal para el resultado de la auditoría
  isLoading = signal(false);
  auditCompleted = signal(false);

  // Inyección del servicio de auditorías
  private auditsService = inject(AuditsService);

  onUrlSubmit(url: string) {
    this.isLoading.set(true);
    this.auditCompleted.set(false);
    console.log("Iniciando auditoría, isLoading:", this.isLoading());

    this.auditsService.auditUrl(url).subscribe({
      next: (result: AuditApiResponse) => { // Usa la nueva interfaz aquí
        console.log("Resultados de la auditoría:", result);
        // Establecer solo la propiedad auditResult
        this.auditResult.set(result.auditResult);  // Ahora esto es correcto
        console.log("Audit result set in signal:", this.auditResult());
        this.isLoading.set(false);
        this.auditCompleted.set(true);
        console.log("Audit completed:", this.auditCompleted());
      },
      error: (error) => {
        console.error('Error durante la auditoría:', error);
        this.isLoading.set(false);
      }
    });
  }
}
