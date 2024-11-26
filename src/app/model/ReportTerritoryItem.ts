import { ReportTerritoryBlockItem } from './ReportTerritoryBlockItem';
import { Territory } from './Territory';

export class ReportTerritoryItem {
  id: number;
  territory: Territory;
  reportId: number;
  observations: string;
  completed: boolean;
  blocks: ReportTerritoryBlockItem[];
}