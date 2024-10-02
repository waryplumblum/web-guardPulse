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
    generalSettings:{
      Viewport: ["viewport"]
    },
    performance: {
      Accesskeys: [
        "largest-contentful-paint",
        "first-meaningful-paint",
        "speed-index",
        "screenshot-thumbnails",
        "final-screenshot",
        "max-potential-fid",
        "interactive",
        "user-timings",
        "critical-request-chains",
        "network-requests",
        "network-rtt",
        "main-thread-tasks",
        "lcp-lazy-loaded",
        "non-composited-animations",
        "prioritize-lcp-image",
        "bf-cache",
        "script-treemap-data",
      ],
      CumulativeLayoutShift: [
        "first-contentful-paint",
        "total-blocking-time",
        "cumulative-layout-shift",
        "network-server-latency",
        "total-byte-weight",
        "metrics",
      ],
      BootupTime: [
        "bootup-time"
      ],
      UsesRelPreconnect: [
        "uses-rel-preconnect"
      ],
      LongTasks: [
        "long-tasks"
      ],
      LargestContentfulPaintElement: [
        "largest-contentful-paint-element"
      ],
      DuplicatedJavascript: [
        "offscreen-images",
        "unminified-css",
        "unminified-javascript",
        "unused-css-rules",
        "unused-javascript",
        "modern-image-formats",
        "uses-optimized-images",
        "uses-text-compression",
        "uses-responsive-images",
        "efficient-animated-content",
        "duplicated-javascript",
        "legacy-javascript"
      ],
      Redirects: [
        "server-response-time",
        "redirects",
        "render-blocking-resources",
        "uses-http2"
      ],
      DOMSize: [
        "mainthread-work-breakdown",
        "uses-long-cache-ttl",
        "dom-size",
      ]
    },
    accessibility: {
      Accesskeys: [
        "font-display",
        "diagnostics",
        "layout-shifts",
        "unsized-images",
        "accesskeys",
        "button-name",
        "bypass",
        "color-contrast",
        "definition-list",
        "dlitem",
        "document-title",
        "duplicate-id-aria",
        "empty-heading",
        "form-field-multiple-labels",
        "frame-title",
        "heading-order",
        "html-has-lang",
        "html-lang-valid",
        "html-xml-lang-mismatch",
        "identical-links-same-purpose",
        "image-alt",
        "image-redundant-alt",
        "input-button-name",
        "input-image-alt",
        "label-content-name-mismatch",
        "label",
        "landmark-one-main",
        "link-name",
        "link-in-text-block",
        "list",
        "listitem",
        "meta-refresh",
        "meta-viewport",
        "object-alt",
        "select-name",
        "skip-link",
        "tabindex",
        "table-duplicate-name",
        "table-fake-caption",
        "target-size",
        "td-has-header",
        "td-headers-attr",
        "th-has-data-cells",
        "valid-lang",
        "video-caption",
        "custom-controls-labels",
        "custom-controls-roles",
        "focus-traps",
        "focusable-controls",
        "interactive-element-affordance",
        "logical-tab-order",
        "managed-focus",
        "offscreen-content-hidden",
        "use-landmarks",
        "visual-order-follows-dom",
        "no-document-write",
        "uses-passive-event-listeners",
        "link-text"
      ],
      ARIA: [
        "aria-allowed-attr",
        "aria-allowed-role",
        "aria-command-name",
        "aria-conditional-attr",
        "aria-deprecated-role",
        "aria-dialog-name",
        "aria-hidden-body",
        "aria-hidden-focus",
        "aria-input-field-name",
        "aria-meter-name",
        "aria-progressbar-name",
        "aria-prohibited-attr",
        "aria-required-attr",
        "aria-required-children",
        "aria-required-parent",
        "aria-roles",
        "aria-text",
        "aria-toggle-field-name",
        "aria-tooltip-name",
        "aria-treeitem-name",
        "aria-valid-attr-value",
        "aria-valid-attr"
      ]
    },
    seo: {
      Accesskeys: [
        "meta-description",
        "http-status-code",
        "canonical",
        "robots-txt",
        "hreflang",
        "is-crawlable",
        "crawlable-anchors",
        "structured-data",
        "resource-summary",
        "third-party-summary",
        "third-party-facades",
      ],
    },
  };

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
