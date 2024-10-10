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

    const getColorClasses = (score: number) => {
      if (score === 100) {
        return { bgClass: 'bg-green-100', textColorClass: 'text-green-600' };
      } else if (score >= 70) {
        return { bgClass: 'bg-orange-100', textColorClass: 'text-orange-600' };
      } else {
        return { bgClass: 'bg-red-100', textColorClass: 'text-red-600' };
      }
    };

    return [
      {
        label: 'SEO',
        score: auditResult.seo,
        ...getColorClasses(auditResult.seo),
        positiveMessage: '¡Excelente! Tu sitio web está totalmente optimizado para SEO.',
        negativeMessage: 'Mejorar la optimización de meta etiquetas y enlaces internos.'
      },
      {
        label: 'Accesibilidad',
        score: auditResult.accessibility,
        ...getColorClasses(auditResult.accessibility),
        positiveMessage: '¡Perfecto! Tu sitio cumple con todas las buenas prácticas de accesibilidad.',
        negativeMessage: 'Asegúrate de que todas las imágenes tengan texto alternativo y verifica el contraste de color.'
      },
      {
        label: 'Rendimiento',
        score: auditResult.performance,
        ...getColorClasses(auditResult.accessibility),
        positiveMessage: 'Tu sitio web tiene un rendimiento óptimo.',
        negativeMessage: 'Optimiza el tiempo de carga de los recursos y mejora el tiempo de respuesta del servidor.'
      }
    ];
  });

  // Computed Signal para las categorías de reportDetails
  reportDetailCategories = computed(() => {
    const auditResult = this.auditResultSignal();
    if (!auditResult || !auditResult.reportDetails) return [];

    const reportDetails = auditResult.reportDetails;
    console.log("Report Details reportDetailCategories:", reportDetails);  // Verifica los datos


    return [
      {
        name: 'General Settings',
        expanded: false,
        subcategories: Object.keys(reportDetails.generalSettings).map(key => ({
          label: key,
          details: reportDetails.generalSettings[key]
        }))
      },
      {
        name: 'Performance',
        expanded: false,
        subcategories: Object.keys(reportDetails.performance).map(key => ({
          label: key,
          details: reportDetails.performance[key]
        }))
      },
      {
        name: 'Accessibility',
        expanded: false,
        subcategories: Object.keys(reportDetails.accessibility).map(key => ({
          label: key,
          details: reportDetails.accessibility[key]
        }))
      },
      {
        name: 'SEO',
        expanded: false,
        subcategories: Object.keys(reportDetails.seo).map(key => ({
          label: key,
          details: reportDetails.seo[key]
        }))
      }
    ];
  });

  ngOnChanges() {
    if (this.auditResult) {
      console.log('Datos de auditResult:', this.auditResult);
      this.auditResultSignal.set(this.auditResult);
    }
  }

  // Método auxiliar para obtener las claves de un objeto
  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  // Método auxiliar para verificar si 'value' es un objeto
  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  // Formatear el valor de manera dinámica
  formatValue(value: any): string {
    if (this.isObject(value)) {
      // Puedes ajustar este mensaje o mostrar los detalles directamente
      return '[Detalles anidados]';
    }
    return value;
  }


}
