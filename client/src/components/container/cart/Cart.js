import { Grid, Typography, Box, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartActions from '../../../actions/cartActions';
import API from '../../../constants/api/API';
import Storage from '../../../constants/storage';
import localStorageHelper from '../../../helpers/localStorageHelper';
import { MyButton, MyDivider, MyTypography } from '../../custom/previewComponents';
import Denouee0227 from '../../../assets/shoes/Denouee-0227-Velour-Indigo.png';
const Cart = (props) => {


    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);

    const navigate = useNavigate();

    const handleIncreaseQuantity = (id, quantity, stock) => {
        const newQuantity = quantity + 1;

        if (stock <= quantity) return;

        dispatch(CartActions.addItemsToCart(id, newQuantity))
    };
    const handleDecreaseQuantity = (id, quantity) => {
        const newQuantity = quantity - 1;

        if (1 >= quantity) return;

        dispatch(CartActions.addItemsToCart(id, newQuantity))
    };
    const handleDeleteItems = (id) => {
        dispatch(CartActions.removeFromCart(id));
    };

    const handleCheckout = () => {
        if (localStorageHelper.getItem(Storage.AUTH)) {
            navigate(API.paths.app.checkout)
        }
        else {
            navigate(API.paths.app.login);
        }
    }

    const cartItemsColumns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'product', headerName: 'Product', width: 100 },
        { field: 'image', headerName: 'Image', width: 100 },
        { field: 'quantity', headerName: 'Quantity', width: 100 },
        { field: 'size', headerName: 'Size', width: 100 },
        { field: 'total', headerName: 'Total Price', width: 100 },
        { field: 'order', headerName: 'Order', width: 100 },
    ];

    const cartItemsRows = cartItems.map((item, idx) => (
        {
            id: item.id,
            product: item.name,
            image: item.image || "",
            quantity: item.quantity,
            size: item.size,
            total: (item.price * item.quantity),
            order: "Order now"
        }
    ));

    const TypographyCart = (element, variant, sx) => {
        return <MyTypography section="cart" variant={variant} element={element} sx={sx} />
    }

    // console.log(localStorageHelper.getItem(Storage.CART_ITEMS));

    // useEffect(() => {
    //     setCartItems(localStorageHelper.exists(Storage.CART_ITEMS) ? localStorageHelper.getItem(Storage.CART_ITEMS) : []);
    // },[cartItems])

    return (
        <Grid container maxWidth="xl" sx={{ mx: "auto", p: 2 }}>
            {cartItems.length === 0 ?
                <Grid>
                    {TypographyCart("empty", "h4")}
                </Grid> :
                <Grid container>

                    <Grid container>
                        <Grid item xs={3}>
                            {TypographyCart("image", "h5")}
                        </Grid>
                        <Grid item xs={3}>
                            {TypographyCart("product", "h5")}
                        </Grid>
                        <Grid item xs={3}>
                            {TypographyCart("quantity", "h5")}
                        </Grid>
                        <Grid item xs={3}>

                            {TypographyCart("subtotal", "h5")}
                        </Grid>
                        <MyDivider sx={{ width: "100%", my: 2 }} />
                    </Grid>


                    {cartItems && cartItems.map((item, idx) => {

                        return (
                            <Grid container sx={{ alignItems: "center" }} key={idx}>
                                <Grid item xs={3}>
                                    <Box component="img" src={Denouee0227 || item.image} alt="shoe" sx={{ display: "flex", height: "80px" }} /></Grid>
                                <Grid item xs={3}>

                                    <Typography variant="h6">{item.name}</Typography>
                                    {/* <Typography sx={{ display: "inline-block", mr: 0.5 }} variant="h6">{item.price}</Typography>
                                    {TypographyCart("currency", "h6", { display: "inline-block" })} */}

                                </Grid>
                                <Grid item xs={3}>
                                    <MyButton variant="outlined" sx={{ px: 0 }} text="-" onClick={() => handleDecreaseQuantity(item.id, item.quantity, item.stock)} />
                                    <Typography sx={{ display: "inline-block", px: 2, }}>{item.quantity}</Typography>
                                    <MyButton variant="outlined" sx={{ px: 0 }} text="+" onClick={() => handleIncreaseQuantity(item.id, item.quantity)} />
                                </Grid>
                                <Grid item xs={1.5}>
                                    <MyTypography variant="h6" text={item.price * item.quantity} sx={{display:"inline-block", mr:0.5}}/>
                                    {TypographyCart("currency", "h6", { display: "inline-block" })}
                                </Grid>
                                <Grid item xs={1.5}>
                                    <MyButton onClick={() => handleDeleteItems(item.id)} sx={{ display: "flex", my: 1 }} variant="outlined" color="error" section="cart" element="remove" />
                                </Grid>
                                <MyDivider />
                            </Grid>
                        )
                    })}


                    <Grid item xs={12} sx={{ width: "100%", display: "flex", justifyContent: "flex-end", pr: 6 }}>
                        <Grid>
                            <MyTypography variant="h6" text={`Gross Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}`} />
                            <MyButton sx={{ ml: 2 }} variant="outlined" text="Check Out" onClick={handleCheckout} />
                        </Grid>
                    </Grid>

                </Grid>}
        </Grid>
    );
};

export default Cart;