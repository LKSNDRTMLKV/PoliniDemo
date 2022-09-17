import { Box, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../constants/api/API';
import { MyButton, MyTextField, MyTypography } from '../../custom/previewComponents';
import Text from '../../custom/Text';
import VerifiedEcommerce from '../../../assets/verified-ecommerce.png';
import MasterCardVisa from '../../../assets/mastercard-visa.png';


const Footer = (props) => {
    const [email, setEmail] = useState("");

    const TypographyFooter = (element, sx, variant) => (
        <MyTypography section="footer" variant={variant} element={element} sx={sx} />
    );

    return (
        <footer style={{ marginTop: "auto" }}>

            <Grid container maxWidth="xl" sx={{ mx: "auto", p: 2, }} >
                <Divider sx={{ width: "100%", my: 1 }} />
                {/* INFORMATION */}
                <Grid item lg={3} xs={6} >
                    {TypographyFooter("information", { my: 1 }, "h5")}

                    <Link to={API.paths.footer.about}>
                        {TypographyFooter("about")}
                    </Link>
                    <Link to={API.paths.footer.delivery}>
                        {TypographyFooter("delivery")}
                    </Link>
                    <Link to={API.paths.footer.use}>
                        {TypographyFooter("use")}
                    </Link>
                 
                    <Link to={API.paths.footer.reclamation}>
                        {TypographyFooter("reclamation")}
                    </Link>
                    <Link to={API.paths.footer.map}>
                        {TypographyFooter("map")}
                    </Link>
                    <Link to={API.paths.footer.invoices}>
                        {TypographyFooter("invoice")}
                    </Link>
                    <Link to={API.paths.footer.order}>
                        {TypographyFooter("order")}
                    </Link>

                </Grid>

                {/* EXTRA */}
                <Grid item lg={3} xs={6} sx={{ pl: { xs: 3, sm: 0 } }}>
                    {TypographyFooter("extra", { my: 1 }, "h5")}



                    <Link to={API.paths.footer.brands}>
                        {TypographyFooter("brands")}
                    </Link>
                    <Link to={API.paths.footer.gift}>
                        {TypographyFooter("gift")}
                    </Link>
                    <Link to={API.paths.footer.affiliate}>
                        {TypographyFooter("affiliate")}
                    </Link>
                    <Link to={API.paths.footer.special}>
                        {TypographyFooter("special")}
                    </Link>

                    
                    <Link to={API.paths.footer.bulletin}>
                        {TypographyFooter("bulletin")}
                    </Link>
                </Grid>

                <Divider sx={{ width: "100%", my: 1, display: { lg: "none" } }} />

                {/* CONTACT */}
                <Grid item lg={3} sm={6} xs={12}>
                    {TypographyFooter("contact", { my: 1 }, "h5")}

                    {TypographyFooter("address")}
                    {TypographyFooter("phone")}
                    {TypographyFooter("email")}
                </Grid>


                <Divider sx={{ width: "100%", my: 1, display: { sm: "none" } }} />
                {/* SUBSCRIBE */}
                <Grid item lg={3} sm={6} xs={12}>
                    {TypographyFooter("subscribe", { my: 1 }, "h5")}
                    {TypographyFooter("content")}
                    <MyTextField
                        id="email"
                        name="email"
                        label={<Text section="footer" element="input" />}
                        type="email"
                        value={email}

                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <MyButton
                        variant="outlined"
                        section="footer"
                        element="button"
                        sx={{ width: "100%" }}
                    />
                </Grid>


                {/* <Grid container sx={{ alignItems: "center" }}>
                    <Divider sx={{ width: "100%", mb: 1, mt:2 }} />
                    <Grid item md={4} xs={12}>
                        {TypographyFooter("rights")}
                    </Grid>
                    <Grid item md={4} xs={6} sx={{py:{md:0, xs:1}, display:"flex"}}>
                        <Box sx={{m:"auto"}}>
                        <Box component="img" src={MasterCardVisa} height="95px" width="120px" sx={{p:1} }/>
                        <Box component="img" src={VerifiedEcommerce} height="100px" width="100px"  sx={{p:1}}/>
                        </Box>
                    </Grid>
                    <Grid item md={4} xs={6} sx={{textAlign:"end", py:{md:0, xs:1}}}>
                        
                        <Link to={API.paths.footer.privacy}>
                            {TypographyFooter("privacy", {py:0.5})}
                        </Link>
                        <Link to={API.paths.footer.cookies}>
                            {TypographyFooter("cookies", {py:0.5})}
                        </Link>
                        <Link to={API.paths.footer.marketing}>
                        {TypographyFooter("marketing", {py:0.5})}
                    </Link>
                    </Grid>
                </Grid> */}



            </Grid>
        </footer>
    );
};

export default Footer;