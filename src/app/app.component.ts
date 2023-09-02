import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CitiesListComponent } from './cities-list/cities-list.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'funabashi_population_trends';
}
