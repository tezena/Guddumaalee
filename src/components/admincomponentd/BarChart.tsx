import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface BarChartProps {
  data: number[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Clients", "Lawyers", "Cases"],
        datasets: [
          {
            label: "My First Dataset",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
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
      <canvas ref={canvasRef} id="barChart"></canvas>
    </div>
  );
};

export default BarChart;



// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// const BarChart = ({ data }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       // Destroy the existing chart instance if it exists
//       chartRef.current.destroy();
//     }

//     const ctx = document.getElementById("barChart");
//     if (ctx !== null) {
//       // Create a new chart instance
//       const newChartInstance = new Chart(ctx, {
//         type: "bar",
//         data: {
//           labels: ["Clients", "Lawyers", "Cases"],
//           datasets: [
//             {
//               label: "My First Dataset",
//               data: data,
//               backgroundColor: [
//                 "rgba(255, 99, 132, 0.2)",
//                 "rgba(255, 159, 64, 0.2)",
//                 "rgba(255, 205, 86, 0.2)",
//               ],
//               borderColor: [
//                 "rgb(255, 99, 132)",
//                 "rgb(255, 159, 64)",
//                 "rgb(255, 205, 86)",
//               ],
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//         },
//       });

//       // Store the chart instance in the ref
//       chartRef.current = newChartInstance;
//     }

//     // Cleanup function to destroy the chart instance when the component unmounts
//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }
//     };
//   }, [data]); // Re-run this effect when the data prop changes

//   return (
//     <div>
//       <canvas id="barChart"></canvas>
//     </div>
//   );
// };

// export default BarChart;
