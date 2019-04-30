import { DataType } from '../enums/data-type';

/**
 * DEFAULT_DELIMITER is a constant used for 
 * CSV demiliter which is a comma ','
 */
export const DEFAULT_DELIMITER = ",";

/**
 * DEFAULT_LINE_BREAK for a CSV file is
 * '\n', it will vary based on the operting
 * system
 */
export const DEFAULT_LINE_BREAK = "\n";

/**
 * DEFAULT_CSV_TEMPLATE is the base template structure 
 * which is expected from the user to upload
 */
export const DEFAULT_CSV_TEMPLATE = [
    { colName: "FIRST NAME", dataType: DataType.STRING },
    { colName: "SUR NAME", dataType: DataType.STRING },
    { colName: "ISSUE COUNT", dataType: DataType.NUMBER },
    { colName: "DATE OF BIRTH", dataType: DataType.DATE }
];



