import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss',
})
export class CommonTableComponent implements AfterViewInit {
  @Input() custData: PeriodicElement[] = []; // Ensure correct type
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'username'];
  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    // Initialize the data source with an empty array
    this.dataSource = new MatTableDataSource<PeriodicElement>([]);
  }

  ngAfterViewInit() {
    // Update the dataSource with the input data and assign the paginator
    this.dataSource.data = this.custData;
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
