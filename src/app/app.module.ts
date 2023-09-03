import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { CitiesListComponent } from './cities-list/cities-list.component';
import { GrafComponent } from './graf/graf.component';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  
  declarations: [
    AppComponent,
    HeaderComponent,
    CitiesListComponent,
    GrafComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    NgChartsModule,
    RouterModule.forRoot([
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
