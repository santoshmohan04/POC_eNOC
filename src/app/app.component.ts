import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ExpandCollapseComponent } from './components/expand-collapse/expand-collapse.component';
import { TypeAheadComponent } from './components/type-ahead/type-ahead.component';
import { SearchComponent } from './components/search/search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FileUploadComponent, ExpandCollapseComponent, TypeAheadComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'enoc';
  onFilesChanged(files: File[]): void {
    console.log('Uploaded files:', files);
  }
}
