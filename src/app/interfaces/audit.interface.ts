export interface AuditInterface {
  _id: string;
  url: string;
  performance: number;
  accessibility: number;
  seo: number;
  createdAt: Date;
  reportId: string;
}
