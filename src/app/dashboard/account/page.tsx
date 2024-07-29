"use client";
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Traffic } from '@/components/dashboard/overview/traffic';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import ApexChart from 'react-apexcharts';
import merge from 'lodash/merge';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Styled Chart component
const Chart = styled(ApexChart)(({ theme }) => ({
  '& .apexcharts-canvas': {
    '& .apexcharts-tooltip': {
      color: "#2596be",
      boxShadow: "red",
      borderRadius: theme.shape.borderRadius * 1.25,
      '&.apexcharts-theme-light': {
        borderColor: 'transparent',
      },
    },
    '& .apexcharts-xaxistooltip': {
      borderColor: 'transparent',
      color: "#2596be",
      borderRadius: theme.shape.borderRadius * 1.25,
      '&:before': {
        borderBottomColor: alpha(theme.palette.grey[500], 0.24),
      },
      '&:after': {
        borderBottomColor: alpha("#2596be", 0.8),
      },
    },
    '& .apexcharts-tooltip-title': {
      textAlign: 'center',
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: alpha(theme.palette.grey[500], 0.08),
      color: theme.palette.text[theme.palette.mode === 'light' ? 'secondary' : 'primary'],
    },
    '& .apexcharts-legend': {
      padding: 0,
    },
    '& .apexcharts-legend-series': {
      display: 'inline-flex !important',
      alignItems: 'center',
    },
    '& .apexcharts-legend-marker': {
      marginRight: 8,
    },
    '& .apexcharts-legend-text': {
      lineHeight: '18px',
      textTransform: 'capitalize',
    },
  },
}));

// Hook for chart options
function useChart(options) {
  const theme = useTheme();

  const baseOptions = {
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.success.main,
      theme.palette.warning.dark,
      theme.palette.success.darker,
      theme.palette.info.dark,
      theme.palette.info.darker,
    ],
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: theme.palette.text.disabled,
      fontFamily: theme.typography.fontFamily,
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.88,
        },
      },
    },
    fill: {
      opacity: 1,
      gradient: {
        type: 'vertical',
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: 'smooth',
      lineCap: 'round',
    },
    grid: {
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    markers: {
      size: 0,
      strokeColors: theme.palette.background.paper,
    },
    tooltip: {
      theme: false,
      x: {
        show: true,
      },
    },
    legend: {
      show: true,
      fontSize: 13,
      position: 'top',
      horizontalAlign: 'right',
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: {
        horizontal: 8,
      },
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: { bar: { columnWidth: '40%' } },
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: { bar: { columnWidth: '32%' } },
        },
      },
    ],
  };

  return merge(baseOptions, options);
}

export default function Page(): React.JSX.Element {
  const [transactionMethod, setTransactionMethod] = useState([]);
  const theme = useTheme();
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      { name: 'Revenue', type: 'line', data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 130, 145, 150] },
    ],
    colors: ['#02555b'],
  };

  const chartOptions = useChart({
    colors: chartData.colors,
    labels: chartData.labels,
    series: chartData.series,
    xaxis: {
      categories: chartData.labels,
    },
  });
useEffect(()=>{
  const fetchTransactionMethods = async()=>{
    try{
        const response = await axios.get('https://erp-dev.pesaswap.com/api/method/pesaswap.services.rest.get_total_transactions_by_method');
        console.log("Transaction Methods", response.data.message);
        setTransactionMethod(response.data.message);

    } catch(err){
        console.log(err.message);
    }
};
fetchTransactionMethods();
},[transactionMethod])
  return (
    <Grid container spacing={3}>
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[transactionMethod.mpesa,transactionMethod.mtn,transactionMethod.iveri,12]} labels={['Mpesa', 'Momo', 'Iveri','Airtel' ]} sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={8} md={6} xs={12}>
        <Card>
          <CardHeader title="Revenue" subheader="Monthly Data" />
          <Box sx={{ p: 3, pb: 1 }}>
            <Chart
              dir="ltr"
              type="line"
              series={chartData.series}
              options={chartOptions}
              width="100%"
              height={364}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
