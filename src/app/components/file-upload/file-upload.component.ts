import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fileFormats } from '../../data/states';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  imports: [CommonModule, NgbPopoverModule],
})
export class FileUploadComponent {
  @Input() allowedFileTypes:string[] = []; // E.g., ".png,.jpg,.jpeg,.pdf"
  @Input() allowMultiple = false;
  @Output() filesChanged = new EventEmitter<File[]>();

  uploadedFiles: File[] = [];

  // Handle file input change
  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target?.files;
    if (files) {
      const allowedExtensions = fileFormats;
      const validFiles: File[] = [];

      Array.from(files).forEach((file) => {
        if (allowedExtensions.includes(file.type)) {
          validFiles.push(file);
        } else {
          console.warn(`File type not allowed: ${file.name}`);
          alert(`File type not allowed: ${file.name}. Please upload PNG, JPG, JPEG, or PDF files.`);
        }
      });

      this.uploadedFiles = validFiles;
      this.filesChanged.emit(this.uploadedFiles);
    }
  }

  // Clear files
  clearFiles(): void {
    this.uploadedFiles = [];
    this.filesChanged.emit(this.uploadedFiles);

    // Clear the input value manually if needed
    const inputElement = document.getElementById('fileInput') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }

  // Trigger the hidden input
  triggerFileInput(): void {
    const inputElement = document.getElementById('fileInput') as HTMLInputElement;
    inputElement?.click();
  }

  // Get uploaded file names as a label
  getUploadedFilesLabel(): string {
    if (this.uploadedFiles.length === 1) {
      return this.uploadedFiles[0].name;
    } else if (this.uploadedFiles.length > 1) {
      return `${this.uploadedFiles.length} files selected`;
    }
    return 'No files chosen';
  }

  getAllowedFormatsDisplay(): string {
    return this.allowedFileTypes
      .map((format) => format.split('/')[1].toUpperCase())
      .join(', ');
  }
}
