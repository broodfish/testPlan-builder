import type { VDataTable } from "vuetify/components";
import { Context } from "chartjs-plugin-datalabels";

declare global {
  type ReadonlyHeaders = VDataTable["$props"]["headers"];
  type ChartDatalabelsContext = Context;
}
