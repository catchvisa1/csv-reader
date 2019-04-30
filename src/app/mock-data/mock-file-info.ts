import { FileInfo } from '../model/file-info';
import { FileType } from '../enums/file-type';

export const MockFileInfo = <FileInfo>{
    fileName: 'test_file.csv',
    size: 123,
    type: FileType.CSV,
    content: {
        "meta": [[
            { "colIndex": 0, "colName": "Test First name", "colType": 1 },
            { "colIndex": 1, "colName": "Test Sur name", "colType": 1 },
            { "colIndex": 2, "colName": "Test Issue count", "colType": 2 },
            { "colIndex": 3, "colName": "Test Date of birth", "colType": 3 }]],
        "errors": [],
        "data": [
            [{ "colIndex": 0, "colValue": "Theo", "colType": 1 },
            { "colIndex": 1, "colValue": "Jansen", "colType": 1 },
            { "colIndex": 2, "colValue": 5, "colType": 2 },
            { "colIndex": 3, "colValue": "1978-01-01T18:30:00.000Z", "colType": 3 }],
            [{ "colIndex": 0, "colValue": "Fiona", "colType": 1 },
            { "colIndex": 1, "colValue": "de Vries", "colType": 1 },
            { "colIndex": 2, "colValue": 7, "colType": 2 },
            { "colIndex": 3, "colValue": "1950-11-11T18:30:00.000Z", "colType": 3 }],
            [{ "colIndex": 0, "colValue": "Petra", "colType": 1 },
            { "colIndex": 1, "colValue": "Boersma", "colType": 1 },
            { "colIndex": 2, "colValue": 1, "colType": 2 },
            { "colIndex": 3, "colValue": "2001-04-19T18:30:00.000Z", "colType": 3 }]]
    }
};
