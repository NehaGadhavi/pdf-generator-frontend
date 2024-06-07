import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  generatePDF(users: any[]): void {
    const documentDefinition = {
      content: [
        { text: 'User List', style: 'header' },
        {
          table: {
            headerRows: 1,
            body: [
              ['Id', 'Name', 'Email', 'Phone', 'Address'],
              ...users.map(user => [user.id, user.name, user.email, user.phone, user.address])
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };

    // Create the PDF and download
    pdfMake.createPdf(documentDefinition).download('user_list.pdf');
  }
}
