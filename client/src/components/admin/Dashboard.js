import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import orderActions from '../../actions/orderActions';
import productActions from '../../actions/productActions';
import userActions from '../../actions/userActions';
import { MyDivider, MyTypography } from '../custom/previewComponents';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Bar,  } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

const Dashboard = (props) => {

  const { users } = useSelector(state => state.allUsers);

  const { products } = useSelector(state => state.products);

  const {orders } = useSelector(state => state.allOrders);

  const [productsData, setProductsData] = useState({
    labels:products && products.map(product => product.name),
    datasets: [
      {
        label: "Name",
        data: products && products.map(product => product.name)
    }
    ]
  })
  
  const dispatch = useDispatch();
  
  let outOfStock = 0;
  
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
    
    let totalAmount = 0;
    orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
    
    
    
    // const lineState = {
    //   labels: ["Initial Amount", "Amount Earned"],
    //   datasets: [
    //     {
    //       label: "TOTAL AMOUNT",
    //       backgroundColor: ["tomato"],
    //       hoverBackgroundColor: ["rgb(197, 72, 49)"],
    //       data: [0, totalAmount],
    //     },
    //   ],
    // };
    // const doughnutState = {
    //   labels: ["Out of Stock", "InStock"],
    //   datasets: [
    //     {
    //       backgroundColor: ["#00A6B4", "#6800B4"],
    //       hoverBackgroundColor: ["#4B5000", "#35014F"],
    //       data: [outOfStock, products.length - outOfStock],
    //     },
    //   ],
    // };
 
  
  
  
  
  useEffect(() => {
    dispatch(userActions.getAllUsers());
    dispatch(productActions.getAllProducts());
    dispatch(orderActions.getAllOrders());
  }, [dispatch])

  return (
    <Grid container maxWidth="xl" mx="auto" px={2}>
      <Grid item xs={12}>
        <MyTypography variant="h4" section="admin_dashboard" element="header" />
        <MyDivider />
      </Grid>

      <Grid item xs={12}>
        {/* <Line data={lineState} /> */}
        <Bar data={productsData} />
      </Grid>

    </Grid>
  );
};

export default Dashboard;