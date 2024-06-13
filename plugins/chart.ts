import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartJSPluginDataLabels from "chartjs-plugin-datalabels";

export default defineNuxtPlugin(() => {
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    RadialLinearScale,
    ArcElement,
    Filler,
    Title,
    Tooltip,
    Legend,
    ChartJSPluginDataLabels,
  );
});
