import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';

@Injectable()
export class FileService {
  parseComplexInfoAndPersist(file: Express.Multer.File): any {
    const sheetInfo = xlsx.read(file.buffer);
    if (file.originalname.endsWith('.xlsx')) {
      this.convertXlsxToModels(sheetInfo);
    } else {
      throw new Error('Invalid file type');
    }
  }
  private convertXlsxToModels(sheet: xlsx.WorkBook): any {
    const customerInfo = xlsx.utils.sheet_to_json(sheet.Sheets['customer']);
    const orderInfo = xlsx.utils.sheet_to_json(sheet.Sheets['order']);
    console.log(customerInfo, orderInfo);
  }
  private;
}
