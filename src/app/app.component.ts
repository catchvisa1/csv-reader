import { Component } from '@angular/core';

import { FileInfo } from './model/file-info';
import { FileOperationService } from './services/file-operation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * Application parent component to hold all sub components.
 * AppComponent is used during application bootstraping. 
 * 
 * Methods:
 * onFileSelection - triggers when a file is selected using a file dialogue
 * showContentOnScreen - triggers when Read button is clicked 
 */
export class AppComponent {

  /**
   * Property to hold the instance of the processed fileInfo
   * object to pass for its child components
   */
  inputFile: FileInfo = null;

  /**
   * Boolean property to hold the status of the 
   * read button disable status
   */
  disableReadButton: boolean = true;

  /**
   * Boolean property to hold the status of the
   * child component dispaly on screen
   */
  displayContentOnScreen: boolean = false;

  /**
   * default constructor holding the File Operation Service as a
   * dependency injection
   * 
   * @param fileOperation - FileOperationservices 
   */
  constructor(private fileOperationService: FileOperationService) { }

  /**
   * onFileSelection method will be triggered when user selects
   * a file from the file type dialogue.  
   * 
   * @param event EventTarget to capture the selected input file
   * for processing 
   */
  onFileSelection(event: EventTarget) {

    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;

    if (files && files.length > 0) {

      this.disableReadButton = false;
      this.fileOperationService.getFileInfo$(files[0])
        .subscribe(response => {
          this.inputFile = response;
        });
    }
    else {
      this.disableReadButton = true;
      this.inputFile = null;
      this.displayContentOnScreen = false;
    }
  }

  /**
   * showContentOnScreen method will simply change 
   * the displayContentOnScreen flag in order to 
   * show the child elements. 
   */
  showContentOnScreen() {
    this.displayContentOnScreen = true;
  }
}
