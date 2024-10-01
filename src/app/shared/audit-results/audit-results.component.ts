import { Component, computed, Input, OnChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditResultDetails } from '../../interfaces/audit.interface';

@Component({
  selector: 'app-audit-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-results.component.html',
  styleUrl: './audit-results.component.css'
})
export class AuditResultComponent implements OnChanges {
  // Definimos 'auditResult' como un Input que recibe datos del padre
  @Input() auditResult: AuditResultDetails | null = null;
  auditResultSignal = signal<AuditResultDetails | null>(null);

  // Computed Signal para construir dinámicamente las métricas basadas en el 'auditResult'
  metrics = computed(() => {
    if (!this.auditResultSignal()) return [];

    const auditResult = this.auditResultSignal()!;

    return [
      {
        label: 'SEO',
        score: auditResult.seo,
        bgClass: auditResult.seo === 100 ? 'bg-green-100' : 'bg-yellow-100',
        textColorClass: auditResult.seo === 100 ? 'text-green-600' : 'text-yellow-600',
        positiveMessage: '¡Excelente! Tu sitio web está totalmente optimizado para SEO.',
        negativeMessage: 'Mejorar la optimización de meta etiquetas y enlaces internos.'
      },
      {
        label: 'Accesibilidad',
        score: auditResult.accessibility,
        bgClass: auditResult.accessibility === 100 ? 'bg-green-100' : 'bg-yellow-100',
        textColorClass: auditResult.accessibility === 100 ? 'text-green-600' : 'text-yellow-600',
        positiveMessage: '¡Perfecto! Tu sitio cumple con todas las buenas prácticas de accesibilidad.',
        negativeMessage: 'Asegúrate de que todas las imágenes tengan texto alternativo y verifica el contraste de color.'
      },
      {
        label: 'Rendimiento',
        score: auditResult.performance,
        bgClass: auditResult.performance >= 90 ? 'bg-green-100' : 'bg-red-100',
        textColorClass: auditResult.performance >= 90 ? 'text-green-600' : 'text-red-600',
        positiveMessage: 'Tu sitio web tiene un rendimiento óptimo.',
        negativeMessage: 'Optimiza el tiempo de carga de los recursos y mejora el tiempo de respuesta del servidor.'
      }
    ];
  });

  ngOnChanges() {
    if (this.auditResult) {
      this.auditResultSignal.set(this.auditResult);
    }
  }

}

// metrics = [
//   {
//     label: 'SEO',
//     score: this.auditResult?.seo,
//     bgClass: this.auditResult?.seo === 100 ? 'bg-green-100' : 'bg-yellow-100',
//     positiveMessage: '¡Excelente! Tu sitio web está totalmente optimizado para SEO.',
//     negativeMessage: 'Mejorar la optimización de meta etiquetas y enlaces internos.'
//   },
//   {
//     label: 'Accesibilidad',
//     score: this.auditResult?.accessibility,
//     bgClass: this.auditResult?.accessibility === 100 ? 'bg-green-100' : 'bg-yellow-100',
//     positiveMessage: '¡Perfecto! Tu sitio cumple con todas las buenas prácticas de accesibilidad.',
//     negativeMessage: 'Asegúrate de que todas las imágenes tengan texto alternativo y verifica el contraste de color.'
//   },
//   {
//     label: 'Rendimiento',
//     score: this.auditResult?.performance,
//     bgClass: this.auditResult?.performance >= 90 ? 'bg-green-100' : 'bg-red-100',
//     positiveMessage: 'Tu sitio web tiene un rendimiento óptimo.',
//     negativeMessage: 'Optimiza el tiempo de carga de los recursos y mejora el tiempo de respuesta del servidor.'
//   }
// ];

//   reportDetails = [
//     { key: 'first-contentful-paint', label: 'First Contentful Paint' },
//     { key: 'largest-contentful-paint', label: 'Largest Contentful Paint' },
//     { key: 'speed-index', label: 'Speed Index' },
//     { key: 'server-response-time', label: 'Tiempo de Respuesta del Servidor' },
//     { key: 'total-blocking-time', label: 'Tiempo Total de Bloqueo' },
//     { key: 'cumulative-layout-shift', label: 'Cumulative Layout Shift' },
//   ];

//   seoDetails = [
//     { key: 'document-title', label: 'Título del Documento' },
//     { key: 'meta-description', label: 'Descripción Meta' },
//     { key: 'robots-txt', label: 'Estado del Robots.txt' },
//   ];

//   accessibilityDetails = [
//     { key: 'color-contrast', label: 'Contraste de Color' },
//     { key: 'image-alt', label: 'Texto Alternativo en Imágenes' },
//     { key: 'heading-order', label: 'Orden de Encabezados' },
//   ];

// }
