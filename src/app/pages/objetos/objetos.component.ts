import { Component, OnInit } from '@angular/core';
import { Objetos } from '../../interfaces/objetos.interface';
import { TableColums, TableComponent } from '../../components/table/table.component';
import { ObjetosService } from '../../services/objetos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-objetos',
  imports: [CommonModule, TableComponent],
  templateUrl: './objetos.component.html',
  styleUrl: './objetos.component.css'
})
export class ObjetosComponent implements OnInit{
  objetos: Objetos[] = [];
  tableColumns: TableColums<Objetos>[] = []

  constructor(private objetosService: ObjetosService) {}


  ngOnInit(): void {
    this.getAllUsuarios();
    this.setTableColumns();
  }
  setTableColumns() {
    this.tableColumns = 
    [
      {
        label: 'Objeto ID',
        def: 'objeto_id',
        content: (row) => row.objeto_id.toString(),
      },
      {
        label: 'Nombre',
        def: 'nombre_objeto',
        content: (row) => row.nombre_objeto,
      },
      {
        label: 'Tipo',
        def: 'tipo',
        content: (row) => row.tipo,
      },
      {
        label: 'Estado',
        def: 'estado',
        content: (row) => row.estado === 1 ? 'Activo': 'otro',
      }
    ]
  }

  getAllUsuarios(){
    this.objetosService.getObjetosActivos()
    .subscribe({
      next: (data) => {
        this.objetos = data;
        //console.log('Objetos:', data);
      },
      error: (error) => {
        console.error('Error al obtener objetos:', error);
      }
    });
  }
}
