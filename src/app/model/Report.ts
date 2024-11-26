import { ReportTerritoryItem } from './ReportTerritoryItem';

export class Report {
  id: number;
  date: string;
  schedule: any;
  preachingDriverId: number;
  preachingUserNames: string;
  preachingUserLastNames: string;
  observations: string;
  items: ReportTerritoryItem[];
}