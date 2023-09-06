import { Component, OnInit, ViewChild } from '@angular/core';
import { POPULATION_CATEGORIES } from '../population/populationCategory';
import { PopulationCategory, PopulationData } from './graf.types'
import { SelectedDataService } from '../shared/shared.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { cities } from '../population/cities';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-graf',
  templateUrl: './graf.component.html',
  styleUrls: ['./graf.component.css']
})

export class GrafComponent implements OnInit {
  selectedCategory: PopulationCategory | null = null;
  populationCategories = POPULATION_CATEGORIES;
  private populationDataset: PopulationData[] = [];
  private populationDataUrl = '../../assets/population.json';

  constructor(
    private selectedDataService: SelectedDataService,
    private http: HttpClient
  ) {}

  loadPopulationData() {
    this.http.get<PopulationData[]>(this.populationDataUrl).subscribe(data => {
      this.populationDataset = data;
    });
  }

  filterPopulationDataByAreaId(areaId: number) {
    const filteredData = this.populationDataset.filter(data => data.area_id === areaId);
    const graphData = filteredData.map(data => {
      switch (this.selectedCategory?.label) {
        case "総人口":
          return data.total_population;
        case "年少人口":
          return data.young_population;
        case "生産年齢人口":
          return data.working_age_population;
        case "老年人口":
          return data.elderly_population;
        default:
          return 0;
      }
    });
    return graphData;
  }
  
  
  ngOnInit() {
    this.loadPopulationData();

    this.selectedDataService.selectedCityAreaNames$.subscribe(cityAreaNames => {
      // 追加: 現在のdatasetsから削除すべき都市のデータセットを特定
      const datasetsCityNames = this.lineChartData.datasets.map(dataset => dataset.label).filter((label): label is string => !!label);
      const citiesToRemove = datasetsCityNames.filter(cityName => !cityAreaNames.includes(cityName as string));
      // 削除すべき都市のデータセットを削除
      citiesToRemove.forEach(cityName => this.removeCityData(cityName));

      cityAreaNames.forEach(cityAreaName => {
        const matchingCity = cities.find(city => city.areaName === cityAreaName);
        if (matchingCity) {
          this.addOrUpdateCityData(matchingCity.id, cityAreaName);
        }
      });
      console.log(`地域が更新されました: ${cityAreaNames.join(', ')}`);
    });
    
    this.selectedDataService.selectedCategory$.subscribe(category => {
      console.log(`カテゴリが更新されました${category}`);
    });
  }
  
  addOrUpdateCityData(cityId: number, cityName: string) {
    const graphData = this.filterPopulationDataByAreaId(cityId);

    // 既存のデータセットを検索
    const existingDataset = this.lineChartData.datasets.find(dataset => dataset.label === cityName);

    if (existingDataset) {
        existingDataset.data = graphData;
    } else {
        this.lineChartData.datasets.push({
            data: graphData,
            label: cityName,
            // 他の設定 (色など) をここに追加
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        });
    }

    if (this.chart) {
        this.chart.update();
    }
  }

  removeCityData(cityName: string) {
    const indexToRemove = this.lineChartData.datasets.findIndex(dataset => dataset.label === cityName);
    if (indexToRemove !== -1) {
      this.lineChartData.datasets.splice(indexToRemove, 1);
      if (this.chart) {
        this.chart.update();
      }
    }
  }

  onCategoryChange() {
    if (this.selectedCategory) {
      this.selectedDataService.setSelectedCategory(this.selectedCategory.label);
      this.updateGraphDataForCategory();
    } else {
      this.selectedDataService.setSelectedCategory(null);
    }
  }

  updateGraphDataForCategory() {
    const cityAreaNames = this.selectedDataService.getSelectedCityAreaNames();
    cityAreaNames.forEach(cityAreaName => {
      const matchingCity = cities.find(city => city.areaName === cityAreaName);
      if (matchingCity) {
        this.addOrUpdateCityData(matchingCity.id, cityAreaName);
      }
    });
  }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartType: ChartType = 'line';
  
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],  // 初期値を空の配列に変更
    labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        position: 'left',
      },
    },
  };
}
