import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  usuarios: any;
  constructor(private usuarioService: UsuarioService) {}


  ngOnInit(): void {
    this.usuarioService.getUsuarios('listar') // Ejemplo de endpoint
      .subscribe({
        next: (data) => {
          this.usuarios = data;
          console.log('Usuarios:', data);
        },
        error: (error) => {
          console.error('Error al obtener usuarios:', error);
        }
      });
  }
}
