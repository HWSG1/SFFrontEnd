import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Objetos } from '../../interfaces/objetos.interface';
import { ObjetosService } from '../../services/objetos.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] // Cambio aquí también
})
export class SidebarComponent implements OnInit {

  objetos: Objetos[] = [];

  constructor(private objetosService: ObjetosService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getObjetosSidebar();
  }

  getObjetosSidebar(){
    this.objetosService.getObjetosSidebar()
    .subscribe({
      next: (data) => {
        this.objetos = data.map((objeto: { icono: string; }) => {
          return {
            ...objeto,
            icono: this.sanitizer.bypassSecurityTrustHtml(objeto.icono)
          };
        });
        console.log('Objetos:', data);
      },
      error: (error) => {
        console.error('Error al obtener objetos:', error);
      }
    });
  }
}
