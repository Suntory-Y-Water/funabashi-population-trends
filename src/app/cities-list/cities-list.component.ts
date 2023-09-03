import { Component } from '@angular/core';
import { cities } from '../population/cities';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent {
  cities = cities;
  selectedCityAreaNames: string[] = [];

  ngOnInit() {
  }

  onButtonClick(areaName: string) {
    if (this.selectedCityAreaNames.includes(areaName)) {
      // すでに選択されている場合、配列から削除する
      this.selectedCityAreaNames = this.selectedCityAreaNames.filter(name => name !== areaName);
    } else {
      // 新しく選択された場合、配列に追加する
      this.selectedCityAreaNames.push(areaName);
    }
    console.log(`Current selected cities: ${this.selectedCityAreaNames}`);
  }
  
}