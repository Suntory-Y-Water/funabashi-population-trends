import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SelectedDataService {
  private selectedCityAreaNamesSource = new BehaviorSubject<string[]>([]);
  private selectedCategorySource = new BehaviorSubject<string | null>(null);

  selectedCityAreaNames$ = this.selectedCityAreaNamesSource.asObservable();
  selectedCategory$ = this.selectedCategorySource.asObservable();

  setSelectedCityAreaNames(names: string[]) {
    this.selectedCityAreaNamesSource.next(names);
  }

  setSelectedCategory(category: string | null) {
    this.selectedCategorySource.next(category);
  }

  getSelectedCityAreaNames(): string[] {
    return this.selectedCityAreaNamesSource.getValue();
  }
}
