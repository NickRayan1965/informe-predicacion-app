export interface IColumnName {
  type: 'property' | 'text';
  value: string;
}
export class TableItemConfig {
  columnLabel: string;
  valueReference: string | IColumnName[];
}
