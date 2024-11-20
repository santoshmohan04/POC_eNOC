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
    // Set allowed file types
    component.allowedFileTypes = ['image/png', 'application/pdf'];
  
    const mockFiles = [
      new File(['content'], 'file1.png', { type: 'image/png' }),
      new File(['content'], 'file2.pdf', { type: 'application/pdf' }),
      new File(['content'], 'file3.txt', { type: 'text/plain' }),
    ];
  
    // Spy on the EventEmitter and alert
    spyOn(component.filesChanged, 'emit');
    spyOn(window, 'alert'); // Prevent real alerts during the test
  
    // Create a mock FileList
    const fileList = {
      length: mockFiles.length,
      item(index: number) {
        return mockFiles[index];
      },
      [0]: mockFiles[0],
      [1]: mockFiles[1],
      [2]: mockFiles[2],
    };
  
    // Get the input element and define the files property
    const inputElement = fixture.debugElement.query(By.css('#fileInput')).nativeElement;
    Object.defineProperty(inputElement, 'files', { value: fileList });
  
    // Dispatch a change event
    const event = new Event('change');
    inputElement.dispatchEvent(event);
  
    // Trigger the file input handler
    component.handleFileInput(event);
  
    // Check expectations
    expect(component.uploadedFiles).toEqual([mockFiles[0], mockFiles[1]]); // Only valid files
    expect(component.filesChanged.emit).toHaveBeenCalledWith([mockFiles[0], mockFiles[1]]);
    expect(window.alert).toHaveBeenCalledWith(
      'File type not allowed: file3.txt. Please upload PNG, JPG, JPEG, or PDF files.'
    );
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
  
    // Create mock files
    const mockFiles = [
      new File(['content'], 'file1.png', { type: 'image/png' }), // Valid file
      new File(['content'], 'file2.txt', { type: 'text/plain' }) // Invalid file
    ];
  
    // Create a fake FileList
    const fileList = {
      length: mockFiles.length,
      item: (index: number) => mockFiles[index],
      [0]: mockFiles[0],
      [1]: mockFiles[1],
    };
  
    // Find the file input element
    const inputElement = fixture.debugElement.query(By.css('#fileInput')).nativeElement;
  
    // Mock the files property
    Object.defineProperty(inputElement, 'files', {
      value: fileList,
      writable: false,
    });
  
    spyOn(component.filesChanged, 'emit');
  
    // Dispatch a change event on the file input
    const event = new Event('change');
    inputElement.dispatchEvent(event);
  
    // Call the method explicitly since DOM event might not directly invoke it
    component.handleFileInput(event);
  
    // Expectations
    expect(component.uploadedFiles.length).toBe(1); // Only one valid file
    expect(component.uploadedFiles[0].name).toBe('file1.png'); // Valid file
    expect(component.filesChanged.emit).toHaveBeenCalledWith([mockFiles[0]]);
  });
});
