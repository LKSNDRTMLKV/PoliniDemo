import { Grid, Paper, Box, IconButton, Card, Typography, Divider, Rating, Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MyTextField, MyDivider } from '../../custom/previewComponents';
import AlertMessage from '../../../messages/AlertMessage';
import productActions from '../../../actions/productActions';
import Denouee0227 from '../../../assets/shoes/Denouee-0227-Velour-Indigo.png';
import Denouee04050Mare from '../../../assets/shoes/Denouee-04050-Velour-Mare.png';
import Denouee04050Mustard from '../../../assets/shoes/Denouee-04050-Velour-Mustard.png';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Favorite from '@mui/icons-material/Favorite';
import { ColorModeContext } from '../../../context/ColorModeContext';
import CartActions from '../../../actions/cartActions';

const ProductDetails = (props) => {
    const dummyImgData = [
        {
            publicId: "sample",
            url: Denouee0227,
        },
        {
            publicId: "sample",
            url: Denouee04050Mare,
        },
        {
            publicId: "sample",
            url: Denouee04050Mustard,
        },
    ];

    const {mode} = useContext(ColorModeContext);

    const [productCounter, setProductCounter] = useState(0);

    const length = dummyImgData.length;
    const windowWidth = window.screen.width;

    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeDot, setActiveDot] = useState(0);

    const [messageData, setMessageData] = useState({});

    const [activeProductSize, setActiveProductSize] = useState(null);

    const [rating,setRating] = useState(0);

    const nextSlide = () => {
        setCurrentSlide(slide => slide == length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setCurrentSlide(slide => slide == 0 ? length - 1 : slide - 1)
    };

    const handleCurrentSlide = (idx) => {
        setCurrentSlide(idx);
    }

    const { id } = useParams();

    const dispatch = useDispatch();



    const { product, loading, error } = useSelector(state => state.productDetails);

    // const handleImageEffects = () => {
    //     const settings = {
    //         transform:"scale(1.1)"
    //     }
    //     setTimeout(() => {
    //         settings
    //     }
    //     ,1000)
    // }

    const handleAddToCart = () => {
        if(productCounter === 0 || activeProductSize === null) {
            setMessageData({HasError:true, Message:"Please add the quantity and size of the product"});
        }
        else {
            dispatch(CartActions.addItemsToCart(id, productCounter,activeProductSize));
            setMessageData({Message: "Product has been added to your cart"})
        }
    }

    const handleActiveProductSize = (size) => {
        setActiveProductSize(size)
        setMessageData({});
    };

    const handleDecreaseQuantity = () => {
        setProductCounter(counter => counter > 0 ? counter - 1 : 0)
        setMessageData({});
    };

    const handleIncreaseQuantity = () => {
        setProductCounter(counter => counter + 1)
        setMessageData({});
    };

    useEffect(() => {
        if(error) {
            console.log(error)
            setMessageData({ Message: error, HasError: true });
        }
        console.log(productCounter)
        dispatch(productActions.getProduct(id));
        // product && setRating(Math.round(product.rating))
        // console.log(product, id)
    }, [dispatch, id, error, messageData, productCounter]);

    return (

        <Grid container maxWidth="xl" sx={{ justifyContent: "center", alignItems: "center", mx: "auto", }}>

            <AlertMessage {...messageData}/>

            {product && !loading &&
            <>
            <Grid item md={6} xs={12}>
                <Box sx={{
                    height: "400px",
                    display: "flex", justifyContent: "center", mx: "auto"
                }}>


                    <Grid container
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            mx: "auto",

                        }}>

                        {dummyImgData.map((item, idx) => {
                            if (idx === currentSlide) {
                                return (
                                    <Grid item key={idx} xs={12} sx={{ justifyContent: "center", display: "flex", position: "relative", }}>

                                        <Box component="img" src={item.url}
                                            sx={[
                                                // idx === currentSlide && {
                                                //     transform: setTimeout(() => { "transform:scale(1.1)" }, 1000),
                                                //     transitionDuration: "2s"
                                                // }, 
                                                {
                                                    borderRadius:"10%",
                                                    border:"2px solid",
                                                    borderColor:mode === "light" ? "#0288d1" : "#6e2aa4",
                                                    height: "auto",
                                                    width: "90%",
                                                    filter: mode!== "light" && "brightness(60%)",
                                                    // maxHeight: { xs: 180, sm: 300, md: 360 },
                                                    // maxWidth: { xs: 300, sm: 500, md: 600 },
                                                    mx: "3%"
                                                }]}

                                        />


                                        <IconButton color="toggledPrimarySecondary" size="large" sx={{
                                            position: "absolute", left: "5%", top: "15%",
                                           borderRadius:"15%", height: "70%"
                                        }}
                                            onClick={prevSlide}
                                        >

                                            <NavigateBeforeIcon />
                                        </IconButton>

                                        <IconButton color="toggledPrimarySecondary" size="large" sx={{
                                            position: "absolute", right: "5%", top: "15%",
                                            borderRadius: "15%", height: "70%"
                                        }}
                                            onClick={nextSlide}>
                                            <NavigateNextIcon />
                                        </IconButton>

                                        <Grid sx={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: "50%",
                                            transform: "translateX(-50%)"
                                        }}>
                                            {Array.from({ length: dummyImgData.length }).map((dot, dotIdx) => {
                                                return (
                                                    <IconButton key={dotIdx} color={dotIdx === currentSlide ? "toggledSuccess" : "toggledSecondary"}
                                                        sx={{}}
                                                        onClick={() => handleCurrentSlide(dotIdx)}
                                                    >
                                                        <CircleIcon />
                                                    </IconButton>
                                                )
                                            })}
                                        </Grid>

                                    </Grid>
                                )
                            }
                        })}




                    </Grid>


                </Box>


            </Grid>
            <Grid item md={6} xs={12} sx={{ p: 2, textAlign:"center" }}>

                <Typography variant="h4">{product.name}</Typography>
                <Typography variant='h5'>Опис: {product.description}</Typography>

                <MyDivider />

                {product.discount ?
                    <Grid sx={{ display: "flex", alignItems: "center", mt: 1, justifyContent: "center" }}>
                        <Typography variant="h4">{product.price - (product.price / 100) * product.discount} Ден</Typography>
                        <Typography variant="h5" sx={{ textDecoration: "line-through", ml: 4 }}>{product.price} Ден </Typography>
                    </Grid>
                    :
                    <Typography variant="h4">{product.price} Ден</Typography>
                }
                <Typography variant="h6">Статус: {product.stock > 0 ? "Во резерва" : "Распродадено"}</Typography>

                <MyDivider />

                {/* <Typography variant="h4">
                    {product.discont ? `${product.price - (product.price / 100) * product.discount} Ден` : `${product.price} Ден`}
                </Typography> */}
                <Grid sx={{display:"flex", alignItems:"center", justifyContent:"center", flexWrap:"wrap"}}> 
                <Typography sx={{px:2}}>Број</Typography>
                {product.sizes && product.sizes.map((size, idx) => (
                    <Button key={idx} variant="outlined" onClick={() => handleActiveProductSize(size)}
                        color={size === activeProductSize ? "toggledSuccess" : "toggledPrimarySecondary"} sx={{ m: 0.5 }}>
                        {size}
                    </Button>
                ))}
                </Grid>
                
                <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 2, }}>
                    <Grid item md={6} xs={12} sx={{display:"flex", justifyContent:"space-evenly", alignItems:"center", my:1}}>
                    <Typography>Количина</Typography>
                        <IconButton
                            size="small"
                            color="toggledPrimarySecondary"
                            onClick={handleDecreaseQuantity}
                            sx={{ border: "1px solid rgba(110, 42, 164, 0.5)", borderRadius: "10%", }}>
                            <RemoveIcon />
                        </IconButton>

                        <Typography sx={{ mx: 2 }}>{productCounter}</Typography>

                        <IconButton
                            size="small"
                            color="toggledPrimarySecondary"
                            onClick={handleIncreaseQuantity}
                            sx={{ border: "1px solid rgba(110, 42, 164, 0.5)", borderRadius: "10%", }}>
                            <AddIcon />
                        </IconButton>
                        
                    </Grid>

                    <Grid item md={6} xs={12} sx={{display:"flex", justifyContent:"space-around", alignItems:"center", my:1}}>
                        <Button variant="outlined" color="toggledPrimarySecondary" sx={{}} endIcon={<Favorite />} >Омилени</Button>
                        <Button variant="outlined" color="toggledPrimarySecondary" onClick={handleAddToCart} sx={{}} endIcon={<ShoppingCartIcon />} >Корпа</Button>

                    </Grid>



                </Grid>











                <MyDivider />


                <Grid sx={{width:"95%",pl:"2.5%"}}>

                <MyTextField
                    label="Leave a comment"
                    id="review"
                    name="review"
                    
                    color="toggledSuccess"
                    multiline={3}
                // sx={{ width: "80%", my: 2 }}
                />
                </Grid>

                <Grid  sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap:"wrap" }}>
                    <Rating
                        sx={{ display: "flex", my: 0.5, }}
                        value={rating}
                        precision={1}
                        size="large"
                        onChange={(e, value) => setRating(value)}
                    />
                    <Typography variant="body1" sx={{ mx: 4 }}>( {product.numberOfReviews} Прегледи ) </Typography>
                    <Button variant='outlined' color="toggledSecondary" sx={{my:0.5, justifyContent:"flex-end"}}>Остави преглед</Button>

                </Grid>

               


            </Grid>
            </>
            }


        </Grid>

    );
};

export default ProductDetails;