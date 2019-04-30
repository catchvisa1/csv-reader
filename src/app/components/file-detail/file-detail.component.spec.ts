import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FileDetailComponent } from './file-detail.component';
import { MockFileInfo } from 'src/app/mock-data/mock-file-info';

describe('FileDetailComponent', () => {
  let component: FileDetailComponent;
  let fixture: ComponentFixture<FileDetailComponent>;
  let mockFileInfo = MockFileInfo;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display file details if data exist', () => {
    // arrange     
    component.fileInfo = mockFileInfo;
    component.loadData();

    // act
    fixture.detectChanges();

    // assert
    const elements = fixture.debugElement.queryAll(By.css('.file-name-content'));
    expect(elements.length).toEqual(1);
  });

  it('should display an alert if no data exist', () => {
    // arrange     
    component.fileInfo = mockFileInfo;
    component.fileInfo.fileName = "";
    component.loadData();

    // act
    fixture.detectChanges();

    // assert
    const elements = fixture.debugElement.queryAll(By.css('.alert.alert-info'));
    expect(elements.length).toEqual(1);
  });

  it('should display TotalRowCount based on input parameter', () => {
    // arrange     
    component.isContentAvailable = true;
    component.fileInfo = mockFileInfo;
    component.fileInfo.fileName = 'test_file.csv';
    component.fileTotalRows = mockFileInfo.content.data.length;
    component.loadData();

    // act
    fixture.detectChanges();

    // assert
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.file-total-row-count').textContent).toContain('3');
  });

  it('should display TotalColumnCount based on input parameter', () => {
    // arrange     
    component.isContentAvailable = true;
    component.fileInfo = mockFileInfo;
    component.fileInfo.fileName = 'test_file.csv';
    component.fileTotalColumns = mockFileInfo.content.meta[0].length;
    component.loadData();

    // act
    fixture.detectChanges();

    // assert
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.file-total-column-count').textContent).toContain('4');
  });
});
