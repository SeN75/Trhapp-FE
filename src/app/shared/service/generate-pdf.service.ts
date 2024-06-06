import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class GeneratePdfService {
  generatePdf({
    file_name = new Date().getTime() + '',
    data,
  }: {
    file_name: string;
    data: { [k: string]: string }[];
  }) {
    const doc = new jsPDF();

    const columns = Object.keys(data[0]);
    const rows: { [k: string]: string }[] = [...data];
    console.log({ rows, columns });
    doc.setLanguage('ar');

    doc.table(5, 5, rows, columns, {
      autoSize: false,
    });

    doc.save(file_name + '.pdf');
  }
}
