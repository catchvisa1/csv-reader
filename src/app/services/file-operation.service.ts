import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FileInfo } from '../model/file-info';
import { FileType } from '../enums/file-type';
import { DataType } from '../enums/data-type';
import { DEFAULT_LINE_BREAK, DEFAULT_DELIMITER } from '../common/constants';

import { RxReaderService } from './rx-reader-service';

@Injectable({
  providedIn: 'root'
})

/**
 * FileOperationService class is used to get the basic file 
 * details based on input File. 
 * 
 * Public methods: 
 * getFileInfo$ - get the FileInfo observable
 * getFileType - get the FileType
 * getFileExtension - get File extension as string
 */
export class FileOperationService {

  /**
   * Constructor function to initialize and add dependency 
   * injection for the services
   * 
   * @param rxReaderService 
   * service used to read the file and return an observable 
   */
  constructor(private rxReaderService: RxReaderService) { }


  /**
   * getFileInfo$ method is to load the FileInfo object with basic
   * details. Returns a FileInfo observable for the consumers
   *    
   * @param file
   * Taks File interface as a parameter and read the content
   * using RxReaderService and return the data as an observable
   */
  public getFileInfo$(file: File): Observable<FileInfo> {

    return Observable.create(obs => {

      // subscribe the observable to listen for 
      // the file content  
      this.rxReaderService.readFile(file)
        .subscribe(response => {
          let fInfo = new FileInfo();
          fInfo.fileName = file.name;
          fInfo.lastModified = file.lastModified;
          fInfo.lastModifiedDate = new Date(file.lastModified);
          fInfo.size = file.size;
          fInfo.file = file;
          fInfo.type = this.getFileType(file);
          fInfo.content = this.parseCSV(response);

          // push the value once the content is read
          obs.next(fInfo);
        });
    });
  }


  /**
   * getFileType method is used to get the FileType based on the 
   * input File object
   * 
   * @param file
   * Taks File interface as a parameter and read the content
   * extension of the file based on getFileExtension method
   */
  public getFileType(file: File): FileType {

    let fileType = FileType.UNKNOWN;

    if (file) {
      switch (this.getFileExtension(file.name)) {
        case "CSV":
          fileType = FileType.CSV;
          break;
        default:
          fileType = FileType.UNKNOWN;
          break;
      }
    }
    return fileType;
  }


  /**
   * getFileExtension method is used to get the file extension
   * from the file name and returns the output as string
   *  
   * @param fileName 
   * Name of the file with extension
   */
  public getFileExtension(fileName: string): string {

    let fileNameSlits = fileName ? fileName.split('.') : null;
    return fileNameSlits ? fileNameSlits.pop().toUpperCase() : null;
  }


  /**
   * parseCSV is a private method used to parse the file content
   * 
   * @param result 
   * File content as string
   */
  private parseCSV(result: string) {
    var headerFields = [];
    let parseErrors = [];
    let dataFields = [];

    if (result) {

      var rows = (<string>result).split(DEFAULT_LINE_BREAK);
      for (var row = 0; row < rows.length; row++) {

        var cells = rows[row].split(DEFAULT_DELIMITER);
        if (cells && cells.length > 1) {

          // first row will be treated as an header
          if (row == 0) {
            headerFields.push(this.getColumnsData(cells, true));
          }
          else {
            dataFields.push(this.getColumnsData(cells));
          }
        }
      }
    }

    // creating an object to hold the headers, data and errors 
    let csvContent = {
      meta: headerFields,
      errors: parseErrors,
      data: dataFields
    };
    return csvContent;
  }


  /**
   * getColumnsData method is used to process the column data and
   * form the data as an object to hold additional information about
   * its column data return it as an object array
   * 
   * @param cells 
   * cells input argument contains the ccell area of  about the cell
   * @param isHeader 
   */
  private getColumnsData(cells: any, isHeader?: boolean): any {

    let fields = [];

    for (var col = 0; col < cells.length; col++) {
      let item = null;
      let data = cells[col];
      data = data ? this.unquoted(data.trim()) : null;

      switch (col) {
        case 0: // string data type: column First name 
        case 1: // string data type: column Sur name
          if (isHeader) {
            item = this.getHeaderDataAsObj(data, col, DataType.STRING);
          }
          else {
            item = this.getDataAsObj(this.readDataAsString(data), col, DataType.STRING);
          }
          break;

        case 2: // number data type: column Issue count
          if (isHeader) {
            item = this.getHeaderDataAsObj(data, col, DataType.NUMBER);
          }
          else {
            item = this.getDataAsObj(this.readDataAsNumber(data), col, DataType.NUMBER);
          }
          break;

        case 3: // date data type: column Date of birth
          if (isHeader) {
            item = this.getHeaderDataAsObj(data, col, DataType.DATE);
          }
          else {
            item = this.getDataAsObj(this.readDataAsDate(data), col, DataType.DATE);
          }
          break;
      }
      fields.push(item);
    }

    return fields;
  }


  /**
   * readDataAsString method converts the input value into string
   * and returns the string
   * 
   * @param value
   * input value to convert as a string
   */
  private readDataAsString(value: any): string {
    return value ? value.toString() : null;
  }


  /**
   * readDataAsNumber method converts the input value into number
   * and returns the number
   * 
   * @param value
   * input value to convert as a number
   */
  private readDataAsNumber(value: string): number {
    let numberValue = Number(value);
    let numData = !Number.isNaN(numberValue) ? numberValue : null;
    return numData;
  }


  /**
   * readDataAsDate method converts the input value into Date
   * and returns the Date object
   * 
   * @param value
   * input value to convert as a date
   */
  private readDataAsDate(value: string): Date {
    let dateValue = new Date(value);
    let dateData = dateValue ? dateValue : null;
    return dateData;
  }


  /**
   * getDataAsObj method forms the data object based on input
   * parameters and return an object 
   * 
   * @param value - column value 
   * @param index - column index
   * @param colType - column data type
   */
  private getDataAsObj(value: any, index: number, colType: DataType): any {
    return { colIndex: index, colValue: value, colType: colType };
  }


  /**
   * getHeaderDataAsObj method forms the data object based on input
   * parameters and return an object 
   * 
   * @param colName - Name of the column
   * @param colIndex - Index number of the column
   * @param colType - Data type of the column
   */
  private getHeaderDataAsObj(colName: string, colIndex: number, colType: DataType): any {
    return { colIndex: colIndex, colName: colName, colType: colType };
  }


  /**
   * unquoted method used to removes the quote symbol from 
   * strat and end of the input data
   * 
   * @param value - input value as string
   */
  private unquoted(value: string): string {
    return value ? value.replace(/(^")|("$)/g, '') : null;
  }


}

