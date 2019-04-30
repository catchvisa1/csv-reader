import { Component, Input } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FileInfo } from './model/file-info';
import { MockFileInfo } from './mock-data/mock-file-info';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockFileInfo = MockFileInfo;

  @Component({
    selector: 'app-file-detail',
    template: '<div></div>'
  })
  class FakeFileDetailComponent {
    @Input() fileInfo: FileInfo;
  }

  @Component({
    selector: 'app-file-content',
    template: '<div></div>'
  })
  class FakeFileContentComponent {
    @Input() fileInfo: FileInfo;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        FakeFileDetailComponent,
        FakeFileContentComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    // arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    // act

    // assert
    expect(app).toBeTruthy();
  });

  it(`should disable the Read button by default`, () => {
    // arrange
    component.disableReadButton = true;

    // act
    fixture.detectChanges();

    // assert
    let readButton = fixture.debugElement.query(By.css('.read-button')).nativeElement;
    expect(readButton.disabled).toBe(true);
  });
});
