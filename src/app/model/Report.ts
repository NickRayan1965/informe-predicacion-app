import { ReportTerritoryItem } from './ReportTerritoryItem';
import { Schedule } from './Schedule';

export class Report {
  id?: number;
  date?: string;
  schedule?: Schedule;
  preachingDriverId?: number;
  preachingUserNames?: string;
  preachingUserLastNames?: string;
  observations?: string;
  items?: ReportTerritoryItem[];
  public static toReportPlained(report: Report): ReportPlained {
    const areThereOnlyOneTerritory = report.items?.length === 1;
    return {
      ...report,
      schedulePlained: report.schedule.name + ' / ' + report.schedule.startHour + ' - ' + report.schedule.endHour,
      territoriesPlained: report.items?.map((reportTerritoryItem, index) => {
        if (areThereOnlyOneTerritory || index === report.items.length - 1) {
          return reportTerritoryItem.territory.name;
        }
        if (index === report.items.length - 2) {
          return ` ${reportTerritoryItem.territory.name} y `;
        }
        return ` ${reportTerritoryItem.territory.name},`;
      }).join('') ?? '',
    };  
  }
}
export class ReportPlained extends Report {
  territoriesPlained?: string;
  schedulePlained?: string;
}