import { Component, Input } from '@angular/core';
import { AuditInterface, AuditResultDetails } from '../../interfaces/audit.interface';
import { CommonModule } from '@angular/common';
// import { AuditResultsInterface } from '../../interfaces/audit-results.interface';


@Component({
  selector: 'app-audit-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-results.component.html',
  styleUrl: './audit-results.component.css'
})
export class AuditResultComponent {
  @Input() auditResult!: AuditResultDetails; // Recibe los resultados de la auditoría
  ngOnChanges() {
    console.log('Received audit-result:', this.auditResult);
  }
}
