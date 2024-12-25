import {
  DataRepresentation,
  IData,
  IDataObject,
  MeasurementUnit,
  Standard,
} from "./IData";

export class StandardData implements IData {
  private static headers: string[] = ["Standard", "Code", "ID", "OD", "CS"];
  tableText: string;
  standard: Standard;
  data: IDataObject[];

  constructor(rawHtmlTable: string, standard: Standard) {
    this.tableText = rawHtmlTable;
    this.standard = standard;
    this.data = this.extract();
  }

  private stripHtml(html: any) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.firstElementChild as HTMLTableElement;
  }
  private dataMapper(d: string[]): IDataObject {
    return {
      standard: this.standard,
      code: d[0],
      cs: parseFloat(d[4]),
      id: parseFloat(d[5]),
      od: parseFloat(d[6]),
    };
  }
  public static getHeaders() {
    return this.headers;
  }

  private extract(): IDataObject[] {
    const tableText = this.tableText;

    const table = this.stripHtml(tableText);

    let headers: string[] = [];
    let extracted: string[][] = [];

    for (let i = 0, row; (row = table.rows[i]); i++) {
      extracted.push([]);
      for (let j = 0, col; (col = row.cells[j]); j++) {
        if (col.nodeName === "TH") {
          headers.push(col.innerText); // for safekeeping
        } else {
          if (i > 2) {
            if (j === 0 || j === 7) {
              const el = col.firstElementChild! as HTMLElement;
              extracted[i].push(el.innerText); //extract code
            } else {
              extracted[i].push(col.innerText);
            }
          } else {
            extracted[i].push("skipped");
          }
        }
      }
    }
    // remove headers row
    [1, 2, 3].forEach(() => {
      extracted.shift();
    });

    const dataObj = extracted.map((d) => this.dataMapper(d));
    if (!dataObj) throw new Error("invalid data");
    return dataObj;
  }
  private setPrecision(val: number, precision: number) {
    return Number(val.toFixed(precision));
  }
  getValues(unit?: MeasurementUnit): DataRepresentation[] {
    if (unit === MeasurementUnit.INCH) {
      const inchInMm = 1 / 25.4;
      const converted = this.data.map((d: IDataObject) => {
        return {
          unit: MeasurementUnit.INCH,
          standard: d.standard,
          code: d.code,
          cs: this.setPrecision(d.cs * inchInMm, 3),
          id: this.setPrecision(d.id * inchInMm, 3),
          od: this.setPrecision(d.od * inchInMm, 3),
        };
      });
      return converted;
    } else {
      // default in mm
      return this.data.map((d) =>
        Object.assign(d, { unit: MeasurementUnit.MM })
      );
    }
  }
}
