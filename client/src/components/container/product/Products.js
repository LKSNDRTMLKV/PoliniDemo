import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ColorModeContext } from '../../../context/ColorModeContext';
import productActions from '../../../actions/productActions';
import { Card, CardMedia, Grid, Modal, Typography, Box, Paper, Pagination, Slider, Button, InputAdornment } from '@mui/material';
import Denouee0227 from '../../../assets/shoes/Denouee-0227-Velour-Indigo.png'
import ProductCard from './ProductCard';
import { MyTextField } from '../../custom/previewComponents';
import SearchIcon from '@mui/icons-material/Search';
import { useParams } from 'react-router-dom';


const Products = (props) => {
    const dispatch = useDispatch();

    const { mode, toggleColorMode } = useContext(ColorModeContext);

    const toggledColorSuccess = mode === "light" ? "info" : "success";
    const toggledColorSecondary = mode === "light" ? "info" : "secondary";


    const { loading, error, products, productsCount, filteredProductsCount, resultsPerPage, paginationCount } = useSelector(state => state.products);

    const {query} = useParams();

    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 15000]);
    const [category, setCategory] = useState("");
    const [sex, setSex] = useState("");
    const [rating, setRating] = useState(0);
    const [searchProducts, setSearchProducts] = useState("");

   

    const [sliderPrice, setSliderPrice] = useState([0, 15000]);

    const handleCurrentPage = (e, value) => {
        setCurrentPage(value);
    }

    const handlePriceChange = (e, value) => {
        setSliderPrice(value);
    }
    const priceValueText = (value) => {
        return `${value} Ден`
    }

    const handleFilteredProducts = () => {
        setPrice(sliderPrice);
        setKeyword(searchProducts);
    }

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(productActions.clearErrors());
        }

        dispatch(productActions.getProducts(keyword, currentPage, price, category, sex, rating));
    }, [dispatch, keyword, currentPage, price, category, rating, error])

    const [openModal, setOpenModal] = useState(false);
    const toggleModal = () => {
        setOpenModal(!openModal);
    }
    return (


        <Grid container maxWidth="xl" m="auto" py={4} sx={{ alignItems: "center" }}>
            <Grid item md={6} xs={12} sx={{ px: 2 }}>
                <MyTextField
                label="Search"
                    value={searchProducts}
                    name="searchProducts"
                    id="searchProducts"
                    onChange={(e) => setSearchProducts(e.target.value)}
                    color="toggledSuccess"
                    inputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}

                />
            </Grid>
            <Grid item md={6} xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", px: 2 }}>
                <Grid item xs={3}>
                    <Typography variant="h6">Цена</Typography>
                </Grid>

                <Grid item xs={6}>
                    <Slider
                        min={0}
                        max={15000}
                        step={100}
                        getAriaLabel={() => "Price Range"}
                        value={sliderPrice}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={priceValueText}
                        sx={{ width: "80%", }}
                    />

                </Grid>
                <Grid item xs={3}>
                    <Button variant="outlined" color="toggledSecondary" onClick={handleFilteredProducts}>Search</Button>

                </Grid>
            </Grid>



            {products && products.map((product, idx) => {

                return (
                    <ProductCard key={product._id} mode={mode} loading={loading} product={product} img={Denouee0227}
                        toggledColorSuccess={toggledColorSuccess}
                        toggledColorSecondary={toggledColorSecondary}
                    />
                )
            })}

            {paginationCount > 1 && 
            (
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", m: 2 }}>
                    <Pagination
                        color="toggledPrimarySecondary"
                        boundaryCount={8}
                        page={currentPage}
                        count={paginationCount}
                        onChange={handleCurrentPage}
                        shape="rounded"
                        sx={[{".Mui-selected": {color:"#fff!important"},}]}
                    />
                </Grid>
                )
            }

            {/* {products?.map((product,idx) => (
                <Box key={idx} component="img">
                </Box>
                    ))} */}

        

        </Grid>

    );
};

export default Products;