"use client";
import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';
import { useEffect, useState } from 'react';
import axios from 'axios';
//export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    const [revenue, setRevenue] = useState(null);
    const [transactions, setTransactions]= useState([]);
    const [transactionMethod, setTransactionMethod] = useState([]);
    const [latestModules, setLatestModules] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://erp-dev.pesaswap.com/api/method/pesaswap.services.rest.get_total_revenue');
            console.log(response.data); // Log the entire response data
            const totalRevenue = response.data.message.total_revenue; // Extract total_revenue
            setRevenue(totalRevenue);
            
          } catch (err) {
            console.log(err.message);
          } 
        };
        const fetchTransaction = async()=>{
            try{
                const response = await axios.get ('https://erp-dev.pesaswap.com/api/method/pesaswap.services.rest.get_transactions');
                console.log("Transactions", response.data.message);
                setTransactions(response.data.message);

            } catch(err){
                console.log(err.message);
            }
        };
        const fetchTransactionMethods = async()=>{
            try{
                const response = await axios.get('https://erp-dev.pesaswap.com/api/method/pesaswap.services.rest.get_total_transactions_by_method');
                console.log("Transaction Methods", response.data.message);
                setTransactionMethod(response.data.message);

            } catch(err){
                console.log(err.message);
            }
        };
        const fetchLatestModules = async()=>{
            try{
                const response = await axios.get('https://erp-dev.pesaswap.com/api/method/pesaswap.services.rest.get_sales_per_module');
                console.log("Latest Modules", response?.data.message.sales_per_module);
                setLatestModules(response.data.message.sales_per_module);

            } catch(err){
                console.log(err.message);
            }
        };
        fetchLatestModules();
        fetchTransactionMethods();
        fetchTransaction();
        fetchData();
      }, []);
      console.log("123456", revenue);
      console.log("farthy",transactionMethod.mpesa);
      console.log("latestModules",latestModules[0]);
  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value={revenue} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value="1.6k" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} value={transactions.length} />
      </Grid>
      <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[transactionMethod.mpesa,transactionMethod.mtn,transactionMethod.iveri,12]} labels={['Mpesa', 'Momo', 'Iveri','Airtel' ]} sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <LatestProducts
          products={[latestModules]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={8} md={12} xs={12}>
        <LatestOrders
          orders={[
            {
              id: 'ORD-007',
              customer: { name: 'Ekaterina Tankova' },
              amount: 30.5,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-006',
              customer: { name: 'Cao Yu' },
              amount: 25.1,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-004',
              customer: { name: 'Alexa Richardson' },
              amount: 10.99,
              status: 'refunded',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-003',
              customer: { name: 'Anje Keizer' },
              amount: 96.43,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-002',
              customer: { name: 'Clarke Gillebert' },
              amount: 32.54,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-001',
              customer: { name: 'Adam Denisov' },
              amount: 16.76,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}
