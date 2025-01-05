import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { TableColums, TableComponent } from "../table/table.component";
import { Usuario } from '../../interfaces/usuario.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, TableComponent, RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  tableColumns: TableColums<Usuario>[] = []

  constructor(private usuarioService: UsuarioService) {}


  ngOnInit(): void {
    this.getAllUsuarios();
    this.setTableColumns();
  }
  setTableColumns() {
    this.tableColumns = 
    [
      {
        label: 'Usuario ID',
        def: 'usuario_id',
        content: (row) => row.usuario_id.toString(),
      },
      {
        label: 'Usuario',
        def: 'nombre_usuario',
        content: (row) => row.nombre_usuario,
      },
      {
        label: 'Email',
        def: 'email',
        content: (row) => row.email,
      },
      {
        label: 'Estado',
        def: 'estado',
        content: (row) => row.estado === 1 ? 'Activo': 'otro',
      }
    ]
  }

  getAllUsuarios(){
    this.usuarioService.getUsuarios()
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
