import { Component } from '@angular/core';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ExpandCollapseComponent } from './components/expand-collapse/expand-collapse.component';
import { TypeAheadComponent } from './components/type-ahead/type-ahead.component';
import { SearchComponent } from './components/search/search.component';
import { fileFormats } from './data/states';
import { NotificationComponent } from './components/notification/notification.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LangTranslateComponent } from "./components/lang-translate/lang-translate.component";
import { DatabaseService } from './sql-database.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FileUploadComponent, ExpandCollapseComponent, TypeAheadComponent, SearchComponent, NotificationComponent, NgbNavModule, LangTranslateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'enoc';
  file_formats = fileFormats;
  active = "file-upload";

  constructor(private dbService: DatabaseService) { }

  onFilesChanged(files: File[]): void {
    console.log('Uploaded files:', files);
  }

  fetchData() {
    const query = 'SELECT * FROM custinfo;';
    this.dbService.executeQuery(query, (err, results) => {
      if (err) {
        console.error('Query error:', err);
      } else {
        console.log('Query results:', results);
      }
    });
  }
}
