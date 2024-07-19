'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

const desktopImage = '/assets/momo_logo.png';
const tabletImage = '/assets/mpesa_logo.jpg';
const phoneImage = '/assets/airtel_logo.jpeg';
const iveri = '/assets/iveri.jpeg';


export interface TrafficProps {
  chartSeries: number[];
  labels: string[];
  sx?: SxProps;
}

export function Traffic({ chartSeries, labels, sx }: TrafficProps): React.JSX.Element {
  const chartOptions = useChartOptions(labels);

  const sum = chartSeries.reduce((acc, curr) => acc + curr, 0);
  const percentages = chartSeries.map(element => ((element / sum) * 100).toFixed(1));
  console.log("percentages", percentages[0]);
  return (
    <Card sx={sx}>
      <CardHeader title="Payments Methods" />
      <CardContent>
        <Stack spacing={2}>
          <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Stack spacing={1} sx={{ alignItems: 'center' }}>
                  <Image src={tabletImage} alt='icon' width={50} height={50} sx={{ borderRadius: '30%' }} />
                  <Typography color="text.secondary" variant="subtitle2">
                    {percentages[0]}%
                  </Typography>
                </Stack>
                <Stack spacing={1} sx={{ alignItems: 'center' }}>
                <Image src={phoneImage} alt="icon" width={50} height={50} sx={{ borderRadius: '30%' }} /> 
                  <Typography color="text.secondary" variant="subtitle2">
                  {percentages[3]}%
                  </Typography>
                </Stack>
                <Stack spacing={1} sx={{ alignItems: 'center' }}>
                   <Image src={desktopImage} alt='icon' width={50} height={50} sx={{ borderRadius: '30%' }} />
                  <Typography color="text.secondary" variant="subtitle2">
                    {percentages[1]}%
                  </Typography>
                </Stack>
                <Stack spacing={1} sx={{ alignItems: 'center' }}>
                   <Image src={iveri} alt='Iveri' width={50} height={50} sx={{ borderRadius: '30%' }} />
                  <Typography color="text.secondary" variant="subtitle2">
                    {percentages[2]}%
                  </Typography>
                </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent' },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
    dataLabels: { enabled: false },
    labels,
    legend: { show: false },
    plotOptions: { pie: { expandOnClick: false } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}
