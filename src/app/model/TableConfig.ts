export interface IColumnName {
  columnName: string;
}
export class TableItemConfig {
  columnLabel: string;
  valueReference: string | IColumnName[];
}
