import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  downloadPdf(pdfUrl: string, fileName: string): void {
    // Create an anchor element
    const a = document.createElement('a');
    a.href = pdfUrl; // Set the URL of the PDF file
    a.target = '_blank'; // Open in the same window
    a.download = fileName; // Set the file name for download

    // Append the anchor to the document, trigger the click, and remove it
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


  downloadPdfFromBlobUrl(blobUrl: string, fileName: string): void {
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = fileName;
    anchor.click();
  }
}
