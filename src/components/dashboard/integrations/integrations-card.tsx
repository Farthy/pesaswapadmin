"use client";
import PropTypes from 'prop-types';
import { memo } from 'react';
import merge from 'lodash/merge';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ApexChart from 'react-apexcharts';
import { alpha, styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

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
      boxShadow: theme.customShadows?.dropdown,
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

  const LABEL_TOTAL = {
    show: true,
    label: 'Total',
    color: theme.palette.text.secondary,
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
    lineHeight: theme.typography.subtitle2.lineHeight,
  };

  const LABEL_VALUE = {
    offsetY: 8,
    color: theme.palette.text.primary,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    lineHeight: theme.typography.h3.lineHeight,
  };

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
        columnWidth: '30%',
      },
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: { bar: { columnWidth: '80%' } },
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

// Dummy data for chart
const dummyData = {
  labels: ['E-Commerce', 'Selling', 'Buying', 'POS', 'Utilities','Accounts','Manufacturing','CRM','HR',"Expenses",'Support','Education'],
  series: [

    { name: 'Modules sold', type: 'bar', data: [35, 45, 50, 55, 54,40,51,59,76,70,20,15] },
  ],
  colors: ['#02555b'],
};

// Combined component
const AppWebsiteVisits = ({ title, subheader, chart = dummyData, ...other }) => {
  const { labels = [], colors = [], series = [], options = {} } = chart;
  const chartOptions = useChart({
    colors,
    labels,
    series,
    xaxis: {
      categories: labels,
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title='Number Of Each Module Sold' subheader={subheader} />

      <Box sx={{ p: 1, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
};

AppWebsiteVisits.propTypes = {
  chart: PropTypes.shape({
    labels: PropTypes.array,
    colors: PropTypes.array,
    series: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.oneOf(['line', 'bar']),
        data: PropTypes.arrayOf(PropTypes.number),
      })
    ),
    options: PropTypes.object,
  }),
  subheader: PropTypes.string,
  title: PropTypes.string,
};

export default memo(AppWebsiteVisits);
