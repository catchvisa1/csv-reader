import { FileType } from '../enums/file-type';

/**
 * FileInfo class is a model class which is used to 
 * hold the required properties of a File under one
 * roof for further processing
 */
export class FileInfo {

    /**
     * propery to hold the File Name as a string
     */
    fileName: string;

    /**
     * propery to hold the Last modified date value as a number
     */
    lastModified: number;

    /**
     * property to hold the Last modified date of the file as date type
     */
    lastModifiedDate: Date;

    /**
     * size property to hold the file size as a number
     */
    size: number;

    /**
     * type property will hold the FileType
     */
    type: FileType;

    /**
     * content property will hold the file content based on its filetype
     */
    content: any;

    /**
     * capture an instance of actual file sent for processing
     */
    file: File;
}
