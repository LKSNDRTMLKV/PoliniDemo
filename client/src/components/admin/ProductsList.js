import { Divider, Typography, Grid, Button, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productActions from '../../actions/productActions';
import { MyButton, MyDivider } from '../custom/previewComponents';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import API from '../../constants/api/API';
import { ColorModeContext } from '../../context/ColorModeContext';
import hashHelper from '../../helpers/hashHelper';
import timeoutHelper from '../../helpers/timeoutHelper';
import AlertMessage from '../../messages/AlertMessage';
import Product from '../../constants/product';
import Denouee_0227 from '../../assets/shoes/Denouee-0227-Velour-Indigo.png';

const ProductsList = (props) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { error, products } = useSelector(state => state.products);

    const {error:deleteError, isDeleted} = useSelector(state => state.product);

    const [messageData, setMessageData] = useState({});

    const handleDeleteProduct = id => {
        dispatch(productActions.deleteProduct(id));
    }

    useEffect(() => {
        dispatch(productActions.getAllProducts());
        if(error) {
            setMessageData({HasError:true, message: error})
            dispatch(productActions.clearErrors());
        }

        if(deleteError) {
            setMessageData({HasError: true, message: deleteError})
            dispatch(productActions.clearErrors());
        }

        if(isDeleted) {
            setMessageData({ Message:isDeleted.message});
            dispatch({type: Product.DELETE_PRODUCT_RESET});
        }



    },[dispatch, error, deleteError, isDeleted,])

    // setInterval(() => console.log(hashHelper()),5000)

    const { mode } = useContext(ColorModeContext);
 
    const productColumns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 150,
            align:"left",
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            align:"left",
            flex: 0.5,
        },
        {
            field: "description",
            headerName: "Description",
            minWidth: 150,
            align:"left",
            flex: 0.5,
        },
        {
            field: "stock",
            headerName: "Stock",
            // type: "number",
            align:"left",
            minWidth: 50,
            flex: 0.5,
        },

        {
            field: "price",
            headerName: "Price",
            // type: "number",
            align:"left",
            minWidth: 50,
            flex: 0.5,
        },
        {
            field: "category",
            headerName: "Category",
            type: "string",
            align:"left",
            minWidth:100,
            flex:0.5,
        },
        {
            field: "sex",
            headerName: "Sex",
            type: "string",
            align:"left",
            minWidth:50,
            flex:0.5,
        },
        {
            field: "rating",
            headerName: "Rating",
            // type: "number",
            align:"left",
            minWidth:50,
            flex:0.5,
        },

        {
            field:"images",
            headerName:"Images",
            align:"left",
            minWidth:100,
            flex:1,
            renderCell: params => (
                <Box component="img" src={params.images && params.images[0].url}/>
            )
        },

        {
            field: "actions",
            flex: 0.5,
            headerName: "",
            minWidth: 200,
            // type: "number",
            align:"left",
            sortable: false,
            renderCell: params => (
                <>
                <Button color="toggledPrimarySecondary" onClick={() => navigate(API.paths.admin.product + params.id)} sx={{ p:2}}>
                    <EditIcon />
                    Edit
                </Button>
                <Button color="error" onClick={() => handleDeleteProduct(params.id)} sx={{ p:2}} >
                    <DeleteIcon />
                    Delete
                </Button>
                </>
            ) 
        }
    ]

    const productRows = [];

    {products && products.forEach(product => {
        productRows.push({
            id:product._id,
            name:product.name,
            description:product.description,
            stock:product.stock,
            price:product.price,
            category:product.category,
            sex:product.sex,
            rating:product.rating,
            images: product.images
        })
    })}

    console.log(productRows);

    return (
        <Grid container maxWidth="xl" mx="auto" px={2}>
            <AlertMessage {...messageData} />

            <Typography variant='h4'>Products</Typography>
            <MyDivider />

            <DataGrid 
            rows={productRows}
            columns={productColumns}
            pageSize={10}
            disableSelectionOnClick
            sx={{"& .MuiDataGrid-columnHeader":{flexDirection:"row!important"}}}
            autoHeight
            components={{
                Toolbar:GridToolbar
            }}
            />


            
        </Grid>
    );
};

export default ProductsList;