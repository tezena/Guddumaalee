import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

interface DoughnutChartProps {
  data: number[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options:{
        
        radius:120,
        plugins: {
          legend:{
              position:"top",
          }
      }
      }
    });
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div>
      <canvas ref={canvasRef} ></canvas>
    </div>
  );
};

export default DoughnutChart;
