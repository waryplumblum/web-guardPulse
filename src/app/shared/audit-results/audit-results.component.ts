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

  // Mapa de categorías a métricas
  categories = {
    performance: [
      "first-contentful-paint",           // Métrica de rendimiento
      "largest-contentful-paint",         // Métrica de rendimiento
      "first-meaningful-paint",           // Métrica de rendimiento
      "speed-index",                       // Métrica de rendimiento
      "screenshot-thumbnails",             // Métrica de rendimiento
      "final-screenshot",                  // Métrica de rendimiento
      "total-blocking-time",               // Métrica de rendimiento
      "max-potential-fid",                 // Faltante
      "cumulative-layout-shift",          // Métrica de rendimiento
      "interactive",                       // Métrica de rendimiento
      "user-timings",                     // Métrica de rendimiento
      "critical-request-chains",          // Métrica de rendimiento
      "network-requests",                  // Métrica de rendimiento
      "network-rtt",                       // Métrica de rendimiento
      "network-server-latency",           // Métrica de rendimiento
      "main-thread-tasks",                // Métrica de rendimiento
      "bootup-time",                      // Métrica de rendimiento
      "uses-rel-preconnect",              // Faltante (mejora de rendimiento)
      "long-tasks",                       // Métrica de rendimiento
      "largest-contentful-paint-element",  // Métrica de rendimiento
      "lcp-lazy-loaded",                   // Métrica de rendimiento
      "total-byte-weight",                 // Métrica de rendimiento
      "uses-long-cache-ttl",               // Faltante
      "duplicated-javascript",             // Información de duplicación de JavaScript
      "offscreen-images",                  // Información de duplicación de JavaScript (también en el mapa original)
      "render-blocking-resources",         // Información sobre redirecciones
      "uses-http2",                        // Información sobre redirecciones
      "uses-text-compression",              // Información de duplicación de JavaScript
    ],
    accessibility: [
      "font-display",                     // Accesibilidad
      "diagnostics",                      // Accesibilidad
      "layout-shifts",                    // Accesibilidad
      "unsized-images",                   // Accesibilidad
      "script-treemap-data",              // Accesibilidad
      "accesskeys",                       // Accesibilidad
      "button-name",                      // Accesibilidad
      "bypass",                           // Accesibilidad
      "color-contrast",                   // Accesibilidad
      "definition-list",                  // Accesibilidad
      "dlitem",                           // Accesibilidad
      "document-title",                   // Accesibilidad
      "duplicate-id-aria",                // Accesibilidad
      "empty-heading",                    // Accesibilidad
      "form-field-multiple-labels",       // Accesibilidad
      "frame-title",                      // Accesibilidad
      "heading-order",                    // Accesibilidad
      "html-has-lang",                    // Accesibilidad
      "html-lang-valid",                  // Accesibilidad
      "html-xml-lang-mismatch",           // Accesibilidad
      "identical-links-same-purpose",     // Accesibilidad
      "image-alt",                        // Accesibilidad
      "image-redundant-alt",              // Accesibilidad
      "input-button-name",                // Accesibilidad
      "input-image-alt",                  // Accesibilidad
      "label-content-name-mismatch",      // Accesibilidad
      "landmark-one-main",                // Accesibilidad
      "link-name",                        // Accesibilidad
      "link-in-text-block",               // Accesibilidad
      "list",                             // Accesibilidad
      "listitem",                         // Accesibilidad
      "meta-refresh",                     // Accesibilidad
      "meta-viewport",                    // Accesibilidad
      "object-alt",                       // Accesibilidad
      "select-name",                      // Accesibilidad
      "skip-link",                        // Accesibilidad
      "tabindex",                         // Accesibilidad
      "table-duplicate-name",             // Accesibilidad
      "table-fake-caption",               // Accesibilidad
      "target-size",                      // Accesibilidad
      "td-has-header",                    // Accesibilidad
      "td-headers-attr",                  // Accesibilidad
      "th-has-data-cells",                // Accesibilidad
      "valid-lang",                       // Accesibilidad
      "video-caption",                    // Accesibilidad
      "custom-controls-labels",           // Accesibilidad
      "custom-controls-roles",            // Accesibilidad
      "focus-traps",                      // Accesibilidad
      "focusable-controls",               // Accesibilidad
      "interactive-element-affordance",   // Accesibilidad
      "logical-tab-order",                // Accesibilidad
      "managed-focus",                    // Accesibilidad
      "offscreen-content-hidden",         // Accesibilidad
      "use-landmarks",                    // Accesibilidad
      "visual-order-follows-dom",         // Accesibilidad
      "no-document-write",                // Accesibilidad
      "uses-passive-event-listeners",     // Accesibilidad
      // Agrega más métricas de accesibilidad según sea necesario
    ],
    seo: [
      "meta-description",           // SEO
      "http-status-code",          // SEO
      "canonical",                  // SEO
      "robots-txt",                // SEO
      "hreflang",                   // SEO
      "is-crawlable",              // SEO
      "crawlable-anchors",         // SEO
      "structured-data",            // SEO
      // Agrega más métricas de SEO según sea necesario
    ]
  }



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
