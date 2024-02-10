/**
 * @description グラフの種類を切り替えるための型
 * @interface PopulationCategory
 */
export interface PopulationCategory {
  id: number;
  label: string;
}

/**
 * @description 各地域の人口動態データ(地域名、年、総人口、年少人口、生産年齢人口、老年人口)
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
