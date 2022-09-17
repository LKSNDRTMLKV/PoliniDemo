import React, { Fragment } from 'react';
import { Card, CardMedia, Grid, Modal, Typography, Box, Skeleton, CardContent, Button, Rating, SpeedDial, SpeedDialAction, SpeedDialIcon, IconButton, } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../../constants/api/API';
import dateHelper from '../../../helpers/dateHelper';


const ProductCard = ({ product, loading, mode, img, toggledColorSecondary }) => {

    // let dateNow = new Date(Date.now());
    // let productDate = new Date(product.createdAt);
    // let newProduct = dateNow - productDate < (30 * 24 * 60 * 60 * 1000) ? true : false;


    const navigate = useNavigate();

    return (
        <Grid item p={2} xl={3} md={4} sm={6} xs={12}>

            <Card sx={[{position:"relative", transition:"transform 0.4s ease-in-out"}, {"&:hover":{transform: "scale(1.0)", }}]}>



                {loading ?
                    <Skeleton animation="wave" variant="rectangular" height={200} /> :
                    <CardMedia
                        height={200}
                        component="img"
                        alt="shoes"
                        image={product.images.url && product.images[0].url}

                        sx={[{ cursor: "pointer", }, mode === "dark" && { filter: "brightness(80%)" }]}
                    />
                }

                <Box></Box>

                {product.discount !== 0 ?
                    loading ?
                        <Skeleton sx={{
                            position: "absolute",
                            top: -5, right: 10, py:2.5, px:8,
                            borderRadius: "50px 25px"
                        }} /> :

                        <Typography variant="body1" sx={[{ position: "absolute", top: 10, right: 10, py: 1, px: 2.5, borderRadius: "50px 25px", },
                        mode === "light" ? { bgcolor: "#0288d1", color: "#fff" } : { bgcolor: "#6e2aa4", color: "#fff" }]}>
                            {product.discount}% Попуст
                        </Typography>
                    : ""
                }

                {dateHelper(product.createdAt) ?
                    (loading ?
                        <Skeleton
                            sx={{
                                position: "absolute",
                                top: -5, left: 10, py: 2.5, px: 5,
                                borderRadius: "50px 25px"
                            }}
                        /> :
                        <Typography variant="body1" sx={[{ position: "absolute", top: 10, left: 10, py: 1, px: 2, borderRadius: "50px 25px", },
                        mode === "light" ? { bgcolor: "#fff", color: "#0288d1" } : { bgcolor: "#5cbc63", color: "#fff" }]}> 
                        Ново
                        </Typography>)
                    : ""
                }




                {loading ?
                    <CardContent sx={{ p: 2 }}>
                        <Skeleton sx={{ py: 1, width: "80%" }} />
                        <Skeleton sx={{ py: 0.5, width: "60%" }} />
                        <Skeleton sx={{ py: 0.5, width: "60%" }} />
                    </CardContent>
                    :
                    <CardContent sx={{ p: "0!important", m: 2 }}>
                        <Link to={`/product/${product._id}`}>
                            <Typography variant="h6" my={0.5}>{product.name}</Typography>
                        </Link>

                        {product.discount !== 0 &&
                            <Typography variant="h6" color={toggledColorSecondary} sx={{ display: "inline-block", mr: 1, }}>
                                {product.discount ? (product.price - ((product.price / 100) * product.discount)) + " Ден" : ""}
                            </Typography>
                        }

                        <Typography variant="p" color={toggledColorSecondary}
                            sx={[{ display: "inline-block", }, (product.discount !== 0) && { textDecoration: "line-through" }]}>
                            {product.price} Ден</Typography>

                        <Box sx={{ position: "absolute", bottom: 35, right: 15, }}>
                            {/* <SpeedDial
                                ariaLabel='product-actions'
                                direction='up'
                                size="small"
                                
                                sx={[mode === "light" ?
                                    { "button": { backgroundColor: "transparent!important", color: "#0288d1", border:"1px solid #0288d1"  }, } :
                                    { "button": { backgroundColor: "transparent!important", color:"#5c237e", border:"1px solid #5c237e" }, },
                                { "button": { borderRadius: "15%" } }
                                ]}
                                icon={<SpeedDialIcon />}
                            >
                                <SpeedDialAction
                                    icon={<FavoriteIcon />}
                                    tooltipTitle="Додај во омилени"
                                    tooltipPlacement='right'
                                    onClick={() => console.log(newProduct && !loading)}
                                />

                                <SpeedDialAction
                                    icon={<ShoppingCartIcon />}
                                    tooltipTitle="Додај во корпа"
                                    tooltipPlacement='right'
                                    onClick={() => navigate(`/product/${product._id}`)}
                                >

                                </SpeedDialAction>



                            </SpeedDial> */}
                
                        </Box>

                        <Rating
                            sx={{ display: "flex", my: 0.5 }}
                            defaultValue={product.rating ? product.rating : 0}
                            precision={1}
                            size="large"
                            readOnly
                        />

                    </CardContent>
                }



            </Card>
        </Grid>
    );
};

export default ProductCard;