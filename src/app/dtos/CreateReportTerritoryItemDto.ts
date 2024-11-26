import { CreateTerritoryBlockItemDto } from './CreateReportTerritoryBlockItemDto ';

export class CreateReportTerritoryItemDto {
  territoryId: number;
  observations: string;
  completed: boolean;
  blocks: CreateTerritoryBlockItemDto[] = [];
}