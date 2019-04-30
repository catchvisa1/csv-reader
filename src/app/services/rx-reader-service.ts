import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * RxReaderService class is used to read the file and return an observable
 * 
 * Methods:
 * readFile - takes blob as input
 */
export class RxReaderService {

  /**
   * RxReaderService constructor to initialize the instance.
   * Constructor with no argument.
   */
  constructor() { }


  /**
   * readFile method creates a FileReader and read the file 
   * content as text and returns an observable once the 
   * read operation is completed.
   * 
   * @param blob - takes a blob as input to read the content
   */
  public readFile = (blob: Blob): Observable<string> => Observable.create(obs => {

    if (!(blob instanceof Blob)) {
      obs.error(new Error('`blob` must be an instance of a File or a Blob.'));
      return;
    }

    const reader = new FileReader();

    reader.onerror = err => obs.error(err);
    reader.onabort = err => obs.error(err);
    reader.onload = () => obs.next(reader.result);
    reader.onloadend = () => obs.complete();

    return reader.readAsText(blob);
  });
}
