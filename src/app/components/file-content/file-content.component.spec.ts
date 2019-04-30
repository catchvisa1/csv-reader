import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FileContentComponent } from './file-content.component';
import { MockFileInfo } from 'src/app/mock-data/mock-file-info';


describe('FileContentComponent', () => {
  let component: FileContentComponent;
  let fixture: ComponentFixture<FileContentComponent>;
  let mockFileInfo = MockFileInfo;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [FileContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display alert if no data exist', () => {
    // arrange     
    component.fileTotalRows = 0;

    // act
    fixture.detectChanges();

    // assert
    const elements = fixture.debugElement.queryAll(By.css('.alert.alert-info'));
    expect(elements.length).toEqual(1);
  });

  it('should display table header columns if data exist', () => {
    // arrange     
    component.fileInfo = mockFileInfo;
    component.loadData();

    // act
    fixture.detectChanges();

    // assert
    const elements = fixture.debugElement.queryAll(By.css('thead > tr > th'));
    expect(elements.length).toEqual(4);
  });

  it('should display table data rows if data exist', () => {
    // arrange     
    component.fileInfo = mockFileInfo;
    component.loadData();

    // act
    fixture.detectChanges();

    // assert
    const elements = fixture.debugElement.queryAll(By.css('tbody > tr'));
    expect(elements.length).toEqual(3);
  });

  it('should filter value if user enters valid filter value', () => {
    // arrange     
    component.fileInfo = mockFileInfo;
    component.loadData(5);

    // act
    fixture.detectChanges();

    // assert
    const elements = fixture.debugElement.queryAll(By.css('tbody > tr'));
    expect(elements.length).toEqual(1);
  });

  it('should display no data match filter criteria if user enters invalid filter value', () => {
    // arrange     
    component.fileInfo = mockFileInfo;
    component.loadData(24);

    // act
    fixture.detectChanges();

    // assert
    const elements = fixture.debugElement.queryAll(By.css('.alert.alert-info'));
    expect(elements.length).toEqual(1);
  });

});
