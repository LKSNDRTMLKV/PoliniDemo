import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import productActions from '../../actions/productActions';
import Product from '../../constants/product';
import handleInputChange from '../../helpers/hooks/handleInputChange';
import AlertMessage from '../../messages/AlertMessage';
import { MyButton, MyDivider, MySelect, MyTextField, MyTypography } from '../custom/previewComponents';
const UpdateProduct = (props) => {

    const { id } = useParams();


    const dispatch = useDispatch();

    const { error: productError, product } = useSelector(state => state.productDetails);

    const { loading, error: updateError, isUpdated } = useSelector(state => state.product);

    const [messageData, setMessageData] = useState({});

    const productSizes = Array.from({ length: 25 }, (_, i) => i + 30);

    const [productDetails, setProductDetails] = useState({
        name: "",
        description: "",
        price: "",
        discount: "",
        category: "",
        brand: "",
        sizes: [],
        sex: "",
        stock: "",
        images: [],
        oldImages: [],
        newImages: [],
    })



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
        oldImages,
        images,
        // newImages,
        // allImages,
    } = productDetails;



    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(productActions.getProduct(id));
        }
        else {
            setProductDetails(prevState => ({
                ...prevState,
                name: product.name,
                description: product.description,
                price: product.price,
                discount: product.discount,
                category: product.category,
                brand: product.brand,
                sizes: product.sizes,
                sex: product.sex,
                stock: product.stock,
                oldImages: product.images,
                images:[]
            }));

        }

        if (productError) {
            setMessageData({ HasError: true, message: productError });
            dispatch(productActions.clearErrors());
        }

        if (updateError) {
            setMessageData({ HasError: true, message: updateError });
            dispatch(productActions.clearErrors());
        }

        if (isUpdated) {
            setMessageData({ message: isUpdated.message });
            dispatch({ type: Product.UPDATE_PRODUCT_RESET });
        }

    }, [dispatch, messageData, productError, updateError, id, product])


    const handleUpdateProduct = () => {

    }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setProductDetails(prevState => ({ ...prevState, [name]: value }));
    // }

    const handleChange = e => handleInputChange(e, setProductDetails);

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

    return (
        <Grid container maxWidth="xl" sx={{ mx: "auto", px: 1, }}>
            <AlertMessage  {...messageData} />

            <MyTypography variant="h4" text="Product Update" />
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
                        required
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

            <Grid item md={6} xs={12}>
                <input
                    type="file"
                    name="products"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                />

                <Grid container direction="row">
                    
                    <Grid item md={6} xs={12} sx={{pr:1}}>
                        <MyTypography variant="h5" text="Old Images" />
                        {oldImages?.map((img, idx) => (
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "300px"
                                }}
                                key={idx}
                                component="img"
                                src={img.url}
                                alt="shoes" />
                        ))}
                    </Grid>

                    <Grid item md={6} xs={12} sx={{pl:1}}>
                        <MyTypography variant="h5" text="New Images" />
                        {images?.map((img, idx) => (
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "300px"
                                }}
                                key={idx}
                                component="img"
                                src={img}
                                alt="shoes" />
                        ))}
                    </Grid>

                </Grid>
            </Grid>








            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
                <MyButton variant="outlined" color="error" text="Delete Product" />
                <MyButton variant="outlined" text="Update Product" onClick={handleUpdateProduct} />
            </Grid>

        </Grid>
    );
};

export default UpdateProduct;