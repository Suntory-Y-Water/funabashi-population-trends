import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedDataService {
  private selectedCityAreaNamesSource = new BehaviorSubject<string[]>([]);
  private selectedCategorySource = new BehaviorSubject<string | null>(null);

  // Observable streams
  selectedCityAreaNames$ = this.selectedCityAreaNamesSource.asObservable();
  selectedCategory$ = this.selectedCategorySource.asObservable();

  // Service commands
  setSelectedCityAreaNames(names: string[]) {
    this.selectedCityAreaNamesSource.next(names);
  }

  setSelectedCategory(category: string | null) {
    this.selectedCategorySource.next(category);
  }
}
