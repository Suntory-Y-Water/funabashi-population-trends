import { Component } from '@angular/core';
import { cities } from '../population/cities';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent {
  cities = [...cities]
}
