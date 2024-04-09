"use client";
import React, { useEffect } from "react";
import Chart from "chart.js/auto";

export function chart() {
  // useEffect(()=>{},[]);

  useEffect(() => {
    const ctx  = document.getElementById("chart3");
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
        options: {
            plugins: {
            legend:{
                position:"top"
            }
        }
          }
      });
    }
  }, []);

  return (
    <>
      <div className="w-full px-4" >
        <canvas id="chart3"></canvas>
      </div>
    </>

  );
}

export default chart;