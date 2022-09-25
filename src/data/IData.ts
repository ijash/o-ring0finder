export interface IData {
  getValues: (unit?: MeasurementUnit) => DataRepresentation[];
}
export interface IDataObject {
  standard: string;
  code: string;
  cs: number;
  id: number;
  od: number;
}
export interface DataRepresentation extends IDataObject {
  unit: MeasurementUnit;
}
export interface IGetValues {}

export enum Standard {
  AS = "AS568",
  JIS = "JIS",
  METRIC = "Common Metric",
}
export enum MeasurementUnit {
  MM = "mm",
  INCH = "Inch",
}

export interface IDataFilter {
  unit?: MeasurementUnit;
  minId?: number;
  maxId?: number;
  minOd?: number;
  maxOd?: number;
  minCs?: number;
  maxCs?: number;
  code?: string;
  standard?: Standard[];
}
