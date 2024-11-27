import { Component } from '@angular/core';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ExpandCollapseComponent } from './components/expand-collapse/expand-collapse.component';
import { TypeAheadComponent } from './components/type-ahead/type-ahead.component';
import { SearchComponent } from './components/search/search.component';
import { fileFormats } from './data/states';
import { NotificationComponent } from './components/notification/notification.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LangTranslateComponent } from "./components/lang-translate/lang-translate.component";
import { StatusIndicatorComponent } from './components/status-indicator/status-indicator.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { ApplicationStatusComponent } from './components/application-status/application-status.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FileUploadComponent, ExpandCollapseComponent, TypeAheadComponent, SearchComponent, NotificationComponent, NgbNavModule,
     LangTranslateComponent, ApplicationStatusComponent, BookmarksComponent, StatusIndicatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'enoc';
  file_formats = fileFormats;
  active = "file-upload";
  onFilesChanged(files: File[]): void {
    console.log('Uploaded files:', files);
  }
}
