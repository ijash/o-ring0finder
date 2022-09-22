export interface IData {
  getValues: () => IDataObject[];
  headers: string[];
}
export interface IDataObject {
  standard: string;
  code: string;
  mmCs: number;
  mmId: number;
  mmOd: number;
  inchCs: number;
  inchId: number;
  inchOd: number;
}

export interface IGetValues {}

export enum Standard {
  AS = "AS568",
  JIS = "JIS",
  METRIC = "Common Metric",
}
export enum MeasurementUnit {
  MM = "mm",
  INCH = "inch",
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
