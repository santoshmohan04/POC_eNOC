import { Injectable } from '@angular/core';
// const mysql = require('mysql2');
import mysql from 'mysql2'

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private connection: any;

  constructor() {
    this.connectToDatabase();
  }

  connectToDatabase() {
    this.connection = mysql.createConnection({
      host: 'sql302.infinityfree.com',
      user: 'epiz_28266684',
      password: '7IvmExQmX3C',
      database: 'epiz_28266684_custinfo',
    });

    this.connection.connect((err: any) => {
      if (err) {
        console.error('Error connecting to database:', err);
      } else {
        console.log('Connected to database');
      }
    });
  }

  executeQuery(query: string, callback: (error: any, results: any) => void) {
    if (this.connection) {
      this.connection.query(query, callback);
    } else {
      console.error('No database connection available');
    }
  }
}
