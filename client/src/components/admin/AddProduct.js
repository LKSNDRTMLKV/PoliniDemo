import { Box, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import productActions from '../../actions/productActions';
import Product from '../../constants/product';
import handleInputChange from '../../helpers/hooks/handleInputChange';
import AlertMessage from '../../messages/AlertMessage';
import { MyButton, MyDivider, MySelect, MyTextField, MyTypography } from '../custom/previewComponents';
import timeoutHelper from '../../helpers/timeoutHelper';
import API from '../../constants/api/API';

const AddProduct = (props) => {
    const { id } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newProduct);

    const { user } = useSelector(state => state.user);

    const [messageData, setMessageData] = useState({});

    const productSizes = Array.from({ length: 25 }, (_, i) => i + 30);



    const [productDetails, setProductDetails] = useState({
        name: "Bianca 2312312",
        description: "black",
        price: "1000",
        discount: "0",
        category: "shoes",
        brand: "guesers",
        sizes: [],
        sex: "Female",
        stock: "10",
        // oldImages: [],
        // newImages: [],
        // allImages: [],
        images: [],
    })

    const [uploadedFiles, setUploadedFiles] = useState([]);

    const {
        name,
        description,
        price,
        discount,
        category,
        brand,
        sizes,
        sex,
        stock,
        images,
        // oldImages,
        // newImages,
        // allImages,
    } = productDetails;

    const [newImages, setNewImages] = useState([]);


    useEffect(() => {


        if (error) {
            setMessageData({ Message: error, HasError: true });
            timeoutHelper(() => setMessageData({}));
        }
        if (success) {
            console.log("Product Created")
            setMessageData({ Message: "Product Created" });
            dispatch({ type: Product.NEW_PRODUCT_RESET });
            navigate(API.paths.admin.product_new);
            // timeoutHelper(() => setMessageData({}))
        }

    }, [dispatch, error, success])

    const handleChange = e => {
        const { name, value, id } = e.target;
        setProductDetails(prevState => ({ ...prevState, [name]: value }));

    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setProductDetails(prevState => ({
                        ...prevState, 
                        images: [...prevState.images, reader.result]
                    }));
                   
                }
            };
        });
    }

    const handleCreateProduct = () => {

        dispatch(productActions.createProduct(productDetails));
    }

    return (
        <Grid container maxWidth="xl" sx={{ mx: "auto", px: 1, }}>
            <AlertMessage  {...messageData} />

            <MyTypography variant="h4" text="Product Create" />
            <MyDivider />

            <Grid item md={6} xs={12}>
                <Grid item lg={6} xs={12}>
                    <MyTextField
                        label="Name"
                        name="name"
                        required
                        onChange={handleChange}
                        value={name}
                    />
                </Grid>
                <Grid item lg={6} xs={12}>
                    <MyTextField
                        label="Description"
                        name="description"
                        required
                        onChange={handleChange}
                        value={description}
                        multiline={2}
                    />
                </Grid>
                <Grid item lg={6} xs={12}>
                    <MyTextField
                        label="price"
                        name="price"
                        required
                        onChange={handleChange}
                        value={price}
                    />
                </Grid>
                <Grid item lg={6} xs={12}>
                    <MyTextField
                        label="discount"
                        name="discount"
                        onChange={handleChange}
                        value={discount}
                    />
                </Grid>
                <Grid item lg={6} xs={12}>
                    <MyTextField
                        label="category"
                        name="category"
                        required
                        onChange={handleChange}
                        value={category}
                    />
                </Grid>
                <Grid item lg={6} xs={12}>
                    <MyTextField
                        label="brand"
                        name="brand"
                        required
                        onChange={handleChange}
                        value={brand}
                    />
                </Grid>

                {/* treba Select */}


                {/* <Grid item lg={6} xs={12}>
                    <MyTextField
                        label="sizes"
                        name="sizes"
                        required
                        onChange={handleChange}
                        value={sizes}
                    />
                </Grid> */}
                <Grid item lg={6} xs={12}>

                    <MySelect
                        name="sizes"
                        required
                        fullWidth
                        label="Sizes"
                        menuItems={productSizes}
                        value={sizes}
                        renderValue
                        onChange={handleChange}
                        multiple
                    />
                </Grid>




                <Grid item lg={6} xs={12}>
                    <MyTextField
                        label="sex"
                        name="sex"
                        required
                        onChange={handleChange}
                        value={sex}
                    />
                </Grid>
                <Grid item lg={6} xs={12}>
                    <MyTextField
                        label="stock"
                        name="stock"
                        required
                        onChange={handleChange}
                        value={stock}
                    />
                </Grid>

            </Grid>

            <Grid item md={6} xs={12} sx={{ my: 2 }}>
                <input
                    type="file"
                    name="products"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                />
                <Grid item md={6} xs={12} sx={{ my: 2 }}>
                    {images?.map((img, idx) => (
                        <Box sx={{ width: "100%" }} key={idx} component="img" src={img} alt="lala" />
                    ))}
                </Grid>
                {/* <Grid item lg={4} md={6} xs={12}>
                    {images?.map((img, idx) => (
                        <Box key={idx} component="img" src={img} alt="lala" />
                    ))}
                </Grid> */}
            </Grid>








            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
                <MyButton variant="outlined" color="error" text="Delete Product" />
                <MyButton disabled={loading} variant="outlined" text="Create" onClick={handleCreateProduct} />
            </Grid>

        </Grid>
    );
};

export default AddProduct;