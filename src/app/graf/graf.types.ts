/**
 * @description
 * @export
 * @interface PopulationCategory
 */
export interface PopulationCategory {
  id: number;
  label: string;
}

/**
 * @description
 * @export
 * @interface PopulationData
 */
export interface PopulationData {
  id: number;
  area_id: number;
  year: number;
  total_population: number;
  young_population: number;
  working_age_population: number;
  elderly_population: number;
}