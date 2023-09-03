import { Component } from '@angular/core';
import { cities } from '../population/cities';
import { SelectedDataService } from '../shared/shared.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent {
  cities = cities;
  selectedCityAreaNames: string[] = [];

  constructor(private selectedDataService: SelectedDataService) {}
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
    this.selectedDataService.setSelectedCityAreaNames(this.selectedCityAreaNames);
  }
}