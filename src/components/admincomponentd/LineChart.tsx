import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface LineChartProps {
  data: number[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'My First Dataset',
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        }],
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div>
      <canvas ref={canvasRef} id="chart2"></canvas>
    </div>
  );
}

export default LineChart;










// import React, { useEffect,useRef } from "react";
// import Chart from "chart.js/auto";

// const LineChart = ({data}) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       // Destroy the existing chart instance if it exists
//       chartRef.current.destroy();
//     }

//     const ctx  = document.getElementById("chart2");
//     if (ctx !== null) {
//       new Chart(ctx, {
//         type: "line",
//         data: {
//           labels: ['Junwary','February','March','April','May','June','July'],
//           datasets: [{
//             label: 'My First Dataset',
//             data: data,
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1
//         }],
//       }
       
//       });
//     }
//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }
//     };
//   }, [data]);

//   return (
//     // className="w-full px-4" 
//     <>
//       <div >
//         <canvas id="chart2"></canvas>
//       </div>
//     </>

//   );
// }

// export default LineChart;