import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjetosService {
  private MyAppUrl: string;
  private MyApiUrl: string; 
  
  constructor(private http: HttpClient) {
    this.MyAppUrl = environment.endpoint;
    this.MyApiUrl = 'api/objetos'
    }

  getObjetos(p0?: string): Observable<any> {
    return this.http.get(`${this.MyAppUrl}${this.MyApiUrl}`);
  }
  getObjetosActivos(p0?: string): Observable<any> {
    return this.http.get(`${this.MyAppUrl}${this.MyApiUrl}/activos`);
  }
  getObjetosSidebar(p0?: string): Observable<any> {
    return this.http.get(`${this.MyAppUrl}${this.MyApiUrl}/sidebar`);
  }
}