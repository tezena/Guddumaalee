"use client";
import { useEffect } from "react";
import Chart from "chart.js/auto";

export function chart() {
  // useEffect(()=>{},[]);

  useEffect(() => {
    
    const ctx  = document.getElementById("donut-chart");
    if (ctx !== null) {
      new Chart(ctx, {
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
      });
    }
  }, []);

  return (
    <>
      <div >
        <canvas id="donut-chart"></canvas>
      </div>
    </>

  );
}

export default chart;

