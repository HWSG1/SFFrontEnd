import { Component, AfterViewInit, ViewChild, input, OnChanges, SimpleChanges, computed } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner'


export interface TableColums<T>{
  label: string,
  def: string,
  content: (row: T) => string | null | undefined
}

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, CommonModule, NgxSpinnerModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent<T> implements AfterViewInit, OnChanges {

  dataSource = new MatTableDataSource<T>([]);
  data = input< T[] >([]);
  colums = input< TableColums<T>[] >([]);
  displayedColumns = computed(() => this.colums().map(col => col.def));

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'].currentValue){
      this.dataSource.data = this.data();
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}