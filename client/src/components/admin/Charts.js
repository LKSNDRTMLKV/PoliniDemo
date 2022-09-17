import { Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import orderActions from '../../actions/orderActions';
import productActions from '../../actions/productActions';
import userActions from '../../actions/userActions';
import { MyDivider } from '../custom/previewComponents';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement  } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(
//     CategoryScale, 
//     LinearScale, 
//     BarElement, 
//     LineElement,
//     Title, 
//     Tooltip, 
//     Legend
// )



const Charts = (props) => {
    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products);
    const { orders } = useSelector(state => state.allOrders);
    const { users } = useSelector(state => state.allUsers);

    // const [outOfStock, setOutOfStock] = useState(0);

    // const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        dispatch(productActions.getAllProducts());
        dispatch(orderActions.getAllOrders());
        dispatch(userActions.getAllUsers());
        console.log(users)
    },[dispatch]);

    let outOfStock = 0;
    products && products.forEach(product => {
        if(product.stock === 0) {
            outOfStock += 1;
        }
    })

    let totalAmount = 0;
    orders && orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        category:"line",
        datasets: [
            {
                label: "Total Amount",
                backgroundColor: "#6e2aa4",
                data: [0, totalAmount],
            }
        ]
    }

    const doughnutState = {
        labels: ["Out of Stock", "In Stock"],
        category:"doughnut",
        datasets: [
            {
                backgroundColor: "#6e2aa4",
                data: [outOfStock, products?.length - outOfStock]
            }
        ]
    }


    return (
        <Grid container maxWidth="xl" mx="auto" px={2}>
            <Typography variant="h4">Charts</Typography>
            <MyDivider />
            {/* <Grid item>
                <LineElement data={lineState} />
            </Grid> */}
            {/* <Grid item>
                <Doughnut data={doughnutState} />
            </Grid> */}
        </Grid>
    );
};

export default Charts;