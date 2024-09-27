import { Component, Input } from '@angular/core';
import { AuditInterface } from '../../interfaces/audit.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-audit-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-results.component.html',
  styleUrl: './audit-results.component.css'
})
export class AuditResultComponent {
  @Input() auditResult!: AuditInterface; // Recibe los resultados de la auditoría
}
