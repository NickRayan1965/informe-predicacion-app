import { CreateReportTerritoryItemDto } from './CreateReportTerritoryItemDto';

export class CreateReportDto {
  date: string;
  scheduleId: number;
  preachingDriverId: number;
  observations: string;
  items: CreateReportTerritoryItemDto[] = [];
}