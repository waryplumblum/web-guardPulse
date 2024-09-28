import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuditInterface, AuditResultDetails,AuditApiResponse } from '../interfaces/audit.interface';


@Injectable({
  providedIn: 'root',
})
export class AuditsService {
  private apiUrl = 'http://localhost:3000/audits'; // Cambia esto a tu URL de API

  constructor(private http: HttpClient) {}

  auditUrl(url: string): Observable<AuditApiResponse> {
    return this.http.post<AuditApiResponse>(this.apiUrl, { url }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message || 'Error en la solicitud'));
  }

  getAudits(): Observable<AuditInterface[]> {
    return this.http.get<AuditInterface[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

}
