import { IData, Standard } from "./IData";
import { StandardData } from "./StandardData";
import As568 from "./dataAs568";
import Jis from "./dataJis";
import Metric from "./dataMetric";

export const As568Data: IData = new StandardData(As568, Standard.AS);
export const JisData: IData = new StandardData(Jis, Standard.JIS);
export const MetricData: IData = new StandardData(Metric, Standard.METRIC);
