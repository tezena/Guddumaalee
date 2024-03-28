"use client";
import { useState, useEffect } from "react";
import ApexCharts from "apexcharts";
interface BarProps {
  height: number;
  s1: number;
  s2: number;
  clabel: string;
  label1: string;
  label2: string;
  // setCount: Function;
  // shouldRenderChart: Boolean;
}
const getChartOptions = (
  s1: number,
  s2: number,
  h: number,
  clabel: string,
  lable1: string,
  lable2: string
) => {
  return {
    series: [s1, s2],
    colors: ["#1C64F2", "#E74694"],
    chart: {
      height: h,
      width: "100%",
      type: "donut",
    },
    stroke: {
      colors: ["transparent"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: 20,
            },
            total: {
              showAlways: true,
              show: true,
              label: clabel,
              fontFamily: "Inter, sans-serif",
              formatter: function (w: ApexCharts.Series) {
                const sum = w.globals.seriesTotals.reduce(
                  (a: number, b: number) => {
                    return a + b;
                  },
                  0
                );
                return sum;
              },
            },
            value: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: -20,
              formatter: function (value: string) {
                return value;
              },
            },
          },
          size: "80%",
        },
      },
    },
    grid: {
      padding: {
        top: -2,
      },
    },
    labels: [lable1, lable2],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "left",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value: string) {
          return value;
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value: string) {
          return value;
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };
};
export function Bar({
  height,
  s1,
  s2,
  clabel,
  label1,
  label2,
  // shouldRenderChart,
  // setCount,
}: BarProps) {
  // const [shouldRender, setShouldRender] = useState(shouldRenderChart);
console.log("one........");

  useEffect(() => {
  console.log("this is the log 1");
  const chartOptions = getChartOptions(s1, s2, height, clabel, label1, label2);
  if (
    document.getElementById("donut-chart") &&
    typeof ApexCharts !== "undefined"
  ) {
    const chart = new ApexCharts(
      document.getElementById("donut-chart"),
      chartOptions
    );
    chart.render();
  }
  }, []);

  return (
    <>
      <div id="donut-chart" className="w-full "></div>
    </>
  );
}

export default Bar;

// useEffect(() => {
//   console.log("this is the log 1");

// }, []);
