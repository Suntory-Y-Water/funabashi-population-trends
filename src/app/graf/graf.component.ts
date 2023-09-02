import { Component, OnInit } from '@angular/core';
import { POPULATION_CATEGORIES } from '../population/constants';

interface PopulationCategory {
  id: number;
  label: string;
}

@Component({
  selector: 'app-graf',
  templateUrl: './graf.component.html',
  styleUrls: ['./graf.component.css']
})
export class GrafComponent implements OnInit {
  selectedCategory: PopulationCategory | null = null;
  populationCategories = POPULATION_CATEGORIES;

  ngOnInit() {
    // 初期値をnull（空白）に設定
    this.selectedCategory = null;
  }

  onCategoryChange() {
    console.log("選択されたカテゴリ:", this.selectedCategory);
    return this.selectedCategory
  }
}
