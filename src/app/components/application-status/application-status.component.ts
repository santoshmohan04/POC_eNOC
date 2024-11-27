import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application-status.component.html',
  styleUrl: './application-status.component.scss'
})
export class ApplicationStatusComponent implements OnInit {

  tableData: any[] = [];
  tableHead: string[] = [];
  statusOfApplication?: string = ''

  ngOnInit(): void {
    const data = [
      { Department: 'EMPOWER', Owner: 'ownerABC@rta.ae',  Date: '01/01/2024', Status: 'New' },
      { Department: 'Roads', Owner: 'ownerABC@rta.ae',  Date: '02/02/2024', Status: 'New' },
      { Department: 'RTA', Owner: 'ownerABC@rta.ae',  Date: '03/03/2024', Status: 'In Progress' },
    ]

    this.tableHead = Object.keys(data[0])
    this.tableData = data
    let latestEntry = this.findLatestEntry(data)
    this.statusOfApplication = latestEntry.Status
  }

  findLatestEntry(data: any[]): any {
    const latestDate = new Date(
      Math.max(...data.map((item) => new Date(item.Date).getTime()))
    );

    return data.find((item) => new Date(item.Date).getTime() === latestDate.getTime());
  }

}