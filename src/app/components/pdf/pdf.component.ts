import { Component } from '@angular/core';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-pdf',
  standalone: true,
  imports: [],
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.scss'
})
export class PdfComponent {

  constructor(private pdfDownloadService: PdfService) { }

  downloadPdf() {
    const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // Replace with your dynamic URL
    const fileName = 'dummy.pdf';
    this.pdfDownloadService.downloadPdf(pdfUrl, fileName)
  }
}
