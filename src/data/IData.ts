export interface IData {
  getValues: () => IDataObject[];
  headers: string[];
}
export interface IDataObject {
  code: string;
  mmCs: number;
  mmId: number;
  mmOd: number;
  inchCs: number;
  inchId: number;
  inchOd: number;
}

export interface IGetValues {}
