import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept allowed file types and allow multiple files as inputs', () => {
    component.allowedFileTypes = ['image/png', 'application/pdf'];
    component.allowMultiple = true;

    expect(component.allowedFileTypes).toEqual(['image/png', 'application/pdf']);
    expect(component.allowMultiple).toBeTrue();
  });

  it('should handle file input and emit valid files', () => {
    const mockFiles = [
      new File(['content'], 'file1.png', { type: 'image/png' }),
      new File(['content'], 'file2.pdf', { type: 'application/pdf' }),
      new File(['content'], 'file3.txt', { type: 'text/plain' })
    ];

    spyOn(component.filesChanged, 'emit');
    spyOn(window, 'alert'); // To prevent actual alerts during tests

    const inputElement = fixture.debugElement.query(By.css('#fileInput')).nativeElement;
    const fileList = {
      item: (index: number) => mockFiles[index],
      ...mockFiles
    };
    Object.defineProperty(inputElement, 'files', { value: fileList });

    const event = new Event('change');
    inputElement.dispatchEvent(event);

    component.handleFileInput(event);

    expect(component.uploadedFiles).toEqual([mockFiles[0], mockFiles[1]]);
    expect(component.filesChanged.emit).toHaveBeenCalledWith([mockFiles[0], mockFiles[1]]);
    expect(window.alert).toHaveBeenCalledWith('File type not allowed: file3.txt. Please upload PNG, JPG, JPEG, or PDF files.');
  });

  it('should clear uploaded files and emit empty array', () => {
    spyOn(component.filesChanged, 'emit');

    component.uploadedFiles = [new File(['content'], 'file1.png', { type: 'image/png' })];
    component.clearFiles();

    expect(component.uploadedFiles).toEqual([]);
    expect(component.filesChanged.emit).toHaveBeenCalledWith([]);
  });

  it('should trigger the hidden file input click', () => {
    const inputElement = fixture.debugElement.query(By.css('#fileInput')).nativeElement;
    spyOn(inputElement, 'click');

    component.triggerFileInput();

    expect(inputElement.click).toHaveBeenCalled();
  });

  it('should return the correct uploaded files label', () => {
    expect(component.getUploadedFilesLabel()).toBe('No files chosen');

    component.uploadedFiles = [new File(['content'], 'file1.png', { type: 'image/png' })];
    expect(component.getUploadedFilesLabel()).toBe('file1.png');

    component.uploadedFiles = [
      new File(['content'], 'file1.png', { type: 'image/png' }),
      new File(['content'], 'file2.pdf', { type: 'application/pdf' })
    ];
    expect(component.getUploadedFilesLabel()).toBe('2 files selected');
  });

  it('should validate files against allowed file types', () => {
    component.allowedFileTypes = ['image/png', 'application/pdf'];
  
    const mockFiles = [
      new File(['content'], 'file1.png', { type: 'image/png' }),
      new File(['content'], 'file2.txt', { type: 'text/plain' })
    ];
  
    // Mock a FileList object
    const fileList = {
      item: (index: number) => mockFiles[index],
      ...mockFiles
    };
  
    const inputElement = fixture.debugElement.query(By.css('#fileInput')).nativeElement;
  
    // Define the `files` property
    Object.defineProperty(inputElement, 'files', {
      value: fileList,
      writable: false
    });
  
    spyOn(component.filesChanged, 'emit');
  
    // Dispatch a change event
    const event = new Event('change');
    inputElement.dispatchEvent(event);
  
    // Call the handler
    component.handleFileInput(event);
  
    // Expectations
    expect(component.uploadedFiles.length).toBe(1);
    expect(component.uploadedFiles[0].name).toBe('file1.png'); // Only the valid file
    expect(component.filesChanged.emit).toHaveBeenCalledWith([mockFiles[0]]);
  });
  

});
