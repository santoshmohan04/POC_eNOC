import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';

@NgModule({
  declarations: [
    FileUploadComponent, // Step 1: Declare the component here
  ],
  imports: [
    CommonModule, // Step 2: Import CommonModule for basic Angular directives like *ngIf, *ngFor
  ],
  exports: [
    FileUploadComponent, // Step 3: Export the component so it can be used elsewhere
  ],
})
export class SharedModule {}
