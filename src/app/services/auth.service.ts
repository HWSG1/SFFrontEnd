/**
 * Servico para autenticar el usuario 
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    return true//!!localStorage.getItem('authToken');
  }
}
