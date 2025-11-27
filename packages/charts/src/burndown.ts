import type { BurndownData } from '@demo-fun-gile/core';
import type { ChartJsConfig } from './types';

/**
 * Generate Chart.js configuration for burndown chart
 */
export function generateBurndownChartConfig(data: BurndownData): ChartJsConfig {
  const labels = data.dailyData.map((point) => {
    const date = new Date(point.date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  const remainingData = data.dailyData.map((point) => point.remainingPoints);
  const idealData = data.dailyData.map((point) => point.idealPoints);

  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Ideal Burndown',
          data: idealData,
          borderColor: 'rgba(128, 128, 128, 0.5)',
          backgroundColor: 'transparent',
          borderWidth: 2,
          fill: false,
          tension: 0,
        },
        {
          label: 'Actual Burndown',
          data: remainingData,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 2,
          fill: true,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `Burndown Chart - ${data.iteration.title}`,
        },
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Story Points',
          },
          beginAtZero: true,
        },
      },
    },
  };
}

/**
 * Generate QuickChart URL for burndown chart
 * QuickChart is a free Chart.js image generation service
 */
export function generateQuickChartUrl(config: ChartJsConfig, width = 600, height = 400): string {
  const baseUrl = 'https://quickchart.io/chart';
  const params = new URLSearchParams({
    c: JSON.stringify(config),
    width: width.toString(),
    height: height.toString(),
    backgroundColor: 'white',
  });

  return `${baseUrl}?${params.toString()}`;
}
