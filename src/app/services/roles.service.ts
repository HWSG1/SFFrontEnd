import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private MyAppUrl: string;
  private MyApiUrl: string; 


  constructor(private http: HttpClient) { 
        this.MyAppUrl = environment.endpoint;
        this.MyApiUrl = 'api/roles'
  }

  getRoles(): Observable<any> {
    return this.http.get(`${this.MyAppUrl}${this.MyApiUrl}`);
  }
  
  getRolesActivos(): Observable<any> {
    return this.http.get(`${this.MyAppUrl}${this.MyApiUrl}/getRolesActivos`);
  }

  crearRoles(rol: any): Observable<any> {
    return this.http.post(`${this.MyAppUrl}${this.MyApiUrl}/nuevorol`, rol);
  }
}
