import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private MyAppUrl: string;
  private MyApiUrl: string; 

  constructor(private http: HttpClient) {
    this.MyAppUrl = environment.endpoint;
    this.MyApiUrl = 'api/usuarios/'
   }

  getUsuarios(p0?: string): Observable<any> {
    return this.http.get(`${this.MyAppUrl}${this.MyApiUrl}`);
  }
}
