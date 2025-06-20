/**
 * Servico del NPX-spinner 
 */

import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequestCount = 0;
  
  constructor(private spinnerService: NgxSpinnerService) { }

  bussy(){
    this.busyRequestCount++;
    this.spinnerService;
    this.spinnerService.show(undefined, {
      type: 'square-jelly-box',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      size: 'medium',
      color: '#fff'
    })
  }
  
  idle() {
    this.busyRequestCount--;
    if(this.busyRequestCount <= 0){
      this.busyRequestCount=0;
      this.spinnerService.hide();
    }
  }
}
