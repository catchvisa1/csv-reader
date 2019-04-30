import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// application specific modules
import { AppRoutingModule } from './app-routing.module';

// application specific components
import { AppComponent } from './app.component';
import { FileDetailComponent } from './components/file-detail/file-detail.component';
import { FileContentComponent } from './components/file-content/file-content.component';

// application specific directives
import { NumberOnlyDirective } from './directives/number-only.directive';


@NgModule({
  declarations: [
    AppComponent,
    FileDetailComponent,
    FileContentComponent,
    NumberOnlyDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
