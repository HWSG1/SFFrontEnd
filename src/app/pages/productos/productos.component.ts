import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/productos.interface';
import { ProductoService } from '../../services/producto.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableColums, TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, TableComponent, RouterLink],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  productos: Producto[] =[];
  tableColumns: TableColums<Producto>[] = []

  constructor(private productoService: ProductoService){}

  ngOnInit(): void {
    this.getAllProductos();
    this.setTableColumns();
  }

  setTableColumns() {
    this.tableColumns = 
    [
      {
        label: 'Producto ID',
        def: 'producto_id',
        content: (row) => row.producto_id.toString(),
      },
      {
        label: 'Codigo',
        def: 'codigo_producto',
        content: (row) => row.codigo_producto,
      },
      {
        label: 'Nombre',
        def: 'nombre',
        content: (row) => row.nombre,
      },
      {
        label: 'Descripcion',
        def: 'descripcion',
        content: (row) => row.descripcion,
      },
      {
        label: 'Presentación',
        def: 'unidad_medida',
        content: (row) => row.unidad_medida,
      },
      {
        label: 'Creado por',
        def: 'creado_por',
        content: (row) => row.creado_por,
      },
      {
        label: 'Estado',
        def: 'estado',
        content: (row) => row.estado === 1 ? 'Activo': 'otro',
      }
    ]
  }
  getAllProductos(){
    this.productoService.getProductos()
    .subscribe({
      next: (data) => {
        this.productos = data;
        console.log('Productos:', data);
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      }
    });
  }
}
