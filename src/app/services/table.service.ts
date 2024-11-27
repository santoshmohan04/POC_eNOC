import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = "https://jsonplaceholder.typicode.com/users"
  constructor(private http: HttpClient) { }

  getTableData(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }
}
