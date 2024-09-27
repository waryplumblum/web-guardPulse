import { Component, signal, inject } from '@angular/core';
import { AuditInterface } from '../../interfaces/audit.interface';
import { AuditsService } from '../../services/audit.service';
import { UrlFormComponent } from '../../shared/url-form/url-form.component';
import { AuditResultComponent } from '../../shared/audit-results/audit-results.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-results',
  standalone: true,
  imports: [UrlFormComponent,AuditResultComponent,CommonModule], // Asegúrate de importar FormsModule
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export default class ResultsComponent {
  auditResult = signal<AuditInterface>({} as AuditInterface);  // Signal para el resultado de la auditoría
  isLoading = signal(false);

  // Inyección del servicio de auditorías
  private auditsService = inject(AuditsService);

  onUrlSubmit(url: string) {
    this.isLoading.set(true);
    console.log("Iniciando auditoría, isLoading:", this.isLoading());
    this.auditsService.auditUrl(url).subscribe({
      next: (result) => {
        console.log("Resultados de la auditoría:", result);
        this.auditResult.set(result); // Actualiza los resultados
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error durante la auditoría:', error);
        this.isLoading.set(false);
      }
    });
  }

}
