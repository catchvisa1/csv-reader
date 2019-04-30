import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { FileInfo } from 'src/app/model/file-info';
import { FileType } from 'src/app/enums/file-type';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.scss']
})

/**
 * FileDetailComponent class is used to display basic file
 * details such as file name, file size, file type, etc.,
 * 
 * Methods:
 * ngOnChanges - triggers during input property change
 */
export class FileDetailComponent implements OnInit, OnChanges {

  /**
   * Input property to collect the FileInfo data from the parent 
   * component for processing inside the component
   */
  @Input() fileInfo: FileInfo;

  /**
   * Property to hold the status of content availability  
   */
  isContentAvailable: boolean = false;

  /**
   * Properties to hold the file details to display on the screen 
   */
  fileType: string;
  fileStatus: string;
  fileTotalRows: number;
  fileTotalColumns: number;

  /**
   * Property to hold copy of the file content for internal processing
   */
  content: any;

  /**
   * Default constructor 
   */
  constructor() { }

  /**
   * noOnInit life cycle method triggers during initialization
   */
  ngOnInit() { }

  /**
   * ngOnChanges method triggers when the component input property 
   * content changes
   */
  ngOnChanges() {
    this.loadData();
  }

  /**
   * loadDate method used to create a fresh copy of content in 
   * local properties for processing
   */
  loadData() {

    if (this.fileInfo && this.fileInfo.fileName) {
      this.isContentAvailable = true;

      this.fileType = FileType[this.fileInfo.type];

      // copying data object to local variable for processing
      this.content = Object.assign({}, this.fileInfo.content);
      this.fileTotalRows = this.content && this.content.data && this.content.data.length ?
        this.content.data.length : 0;
      this.fileTotalColumns = this.content && this.content.meta && this.content.meta.length > 0 ?
        this.content.meta[0].length : 0;

      this.fileStatus = this.content && this.content.errors && this.content.errors.length > 0 ? "Read with errors" : "Success";
    }
    else {
      this.isContentAvailable = false;
    }
  }

}
