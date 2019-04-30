import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { FileInfo } from 'src/app/model/file-info';
import { DataType } from 'src/app/enums/data-type';

@Component({
  selector: 'app-file-content',
  templateUrl: './file-content.component.html',
  styleUrls: ['./file-content.component.scss']
})

/**
 * FileContentComponent class is used to display the file content 
 * in a table format. 
 * 
 * Methods:
 * ngOnInit - triggers during component initialization and sets defauls
 * ngOnChanges - triggers during input property value change
 * onFilterValueChange - triggers during filter value change
 * loadData - method used to load data based on parameters
 */
export class FileContentComponent implements OnInit, OnChanges {

  /**
   * Input property to collect the FileInfo data from the parent 
   * component for processing inside the component
   */
  @Input() fileInfo: FileInfo;

  /**
   * Property to hold the reference of DataType enum
   */
  dateDataType: DataType;

  /**
   * Property to hold the filter input based on user input
   */
  filterInput: number;

  /**
   * Properties to hold the file details for processing 
   */
  fileTotalRows: number = 0;
  fileTotalColumns: number = 0;

  /**
   * Properties to hold copy of the file content for internal processing
   */
  content: any;
  headerColumns: any;
  dataRows: any;

  /**
   * Default constructor
   */
  constructor() { }

  /**
   * ngOnInit triggers during component initialization
   */
  ngOnInit() {
    this.dateDataType = DataType.DATE;
  }

  /**
   * ngOnChanges triggers during input property value change
   * and load data
   */
  ngOnChanges() {
    this.loadData();
  }

  /**
   * onFilterValueChange method triggers based on state change
   * happens in the filter input
   *  
   * @param event - instance of the change event 
   */
  onFilterValueChange(event) {

    if (!isNaN(this.filterInput)) {
      this.loadData(this.filterInput);
    }
  }

  /**
   * loadDate method used to create a fresh copy of content in 
   * local properties for processing
   * 
   * @param filterValue - (Optional) filter value entered by user
   */
  loadData(filterValue?: number) {
    if (this.fileInfo && this.fileInfo.fileName) {

      // copying data object to local variable for processing
      this.content = Object.assign({}, this.fileInfo.content);

      if (this.content) {

        // assign table header columns for display
        this.headerColumns = this.content.meta && this.content.meta.length > 0 ? this.content.meta[0] : null;

        // applying filter value and extracting required rows based on filterValue
        let rows = filterValue ? this.content.data.filter(row => {
          var isRowNeeded = false;
          let colData = row.forEach((col, index) => {
            if (col.colType == 2 && col.colValue == filterValue) {
              isRowNeeded = true;
            }
          });
          return isRowNeeded;
        }) : this.content.data;

        // assign table data for display
        this.dataRows = rows;

        this.fileTotalRows = this.content.data ? this.content.data.length : 0;
        this.fileTotalColumns = this.headerColumns ? this.headerColumns.length : 0;
      }
    }
  }

}
