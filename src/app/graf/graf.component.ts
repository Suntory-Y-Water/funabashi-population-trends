import { Component, OnInit, ViewChild } from '@angular/core';
import { POPULATION_CATEGORIES } from '../population/constants';
import { SelectedDataService } from '../shared/shared.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { cities } from '../population/cities';
import { HttpClient } from '@angular/common/http';


interface PopulationCategory {
  id: number;
  label: string;
}
interface PopulationData {
  id: number;
  area_id: number;
  year: number;
  total_population: number;
  young_population: number;
  working_age_population: number;
  elderly_population: number;
}

@Component({
  selector: 'app-graf',
  templateUrl: './graf.component.html',
  styleUrls: ['./graf.component.css']
})
export class GrafComponent implements OnInit {
  populationDataset: PopulationData[] = [];
  selectedCategory: PopulationCategory | null = null;
  populationCategories = POPULATION_CATEGORIES;

  constructor(
    private selectedDataService: SelectedDataService,
    private http: HttpClient
  ) {}

  private populationDataUrl = '../../assets/population.json';

  loadPopulationData() {
    this.http.get<PopulationData[]>(this.populationDataUrl).subscribe(data => {
      this.populationDataset = data;
    });
  }

  filterPopulationDataByAreaId(areaId: number) {
    const filteredData = this.populationDataset.filter(data => data.area_id === areaId);
   // グラフを更新するためのデータを取得
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
      const firstCityAreaName = cityAreaNames[0];
      const matchingCity = cities.find(city => city.areaName === firstCityAreaName);
      if (matchingCity) {
        this.filterPopulationDataByAreaId(matchingCity.id);
      }
      console.log(`地域が更新されました${firstCityAreaName}`);
    });
    
    this.selectedDataService.selectedCategory$.subscribe(category => {
      console.log(`カテゴリが更新されました${category}`);
    });
  }
  
  onCategoryChange() {
    if (this.selectedCategory) {
      this.selectedDataService.setSelectedCategory(this.selectedCategory.label);
      this.updateGraphData();
    } else {
      this.selectedDataService.setSelectedCategory(null);
    }
  }
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  updateGraphData() {
    if (!this.selectedCategory) return;
    const firstCityAreaName = this.selectedDataService.getSelectedCityAreaNames()[0];
    const matchingCity = cities.find(city => city.areaName === firstCityAreaName);
    if (matchingCity) {
      const graphData = this.filterPopulationDataByAreaId(matchingCity.id);
      this.lineChartData.datasets[0].data = graphData;
      this.lineChartData.datasets[0].label = this.selectedCategory.label;
      
      console.log(`dataの値は${graphData}`);
      console.log(`labelの値は${this.selectedCategory.label}`);
      
      if (this.chart) {
        this.chart.update();
      }
    }
  }
  
  public lineChartType: ChartType = 'line';
  
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: '',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      },
    ],
    labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],  // ラベルを更新
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
