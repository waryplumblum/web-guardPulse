export interface AuditInterface {
  _id: string;
  url: string;
  performance: number;
  accessibility: number;
  seo: number;
  createdAt: Date;
  reportId: string;
}

// export interface AuditResultDetails {
//   accessibility: number;
//   performance: number;
//   seo: number;
//   reportDetails: any; // Aquí puedes definir la estructura de reportDetails si es necesario
//   reportId: string;
// }

export interface AuditResultDetails {
  accessibility: number;
  performance: number;
  seo: number;
  reportDetails: any; // Aquí puedes definir la estructura de reportDetails si es necesario
  reportId: string;
}

export interface AuditApiResponse {
  auditResult: AuditResultDetails; // Aquí usas la interfaz existente
  reportId: string;
}

