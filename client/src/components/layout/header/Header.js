import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Accordion, Container, AccordionDetails, AccordionSummary, AppBar, Button, Drawer, Grid, MenuList, Slide, SpeedDial, SpeedDialAction, SpeedDialIcon, useMediaQuery, useScrollTrigger, Typography, Popover, Breadcrumbs, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import FavoriteIcon from '@mui/icons-material/Favorite';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircle from '@mui/icons-material/AccountCircle';

import PoliniLogoPrimary from '../../../assets/polini-logo-primary.png';
import PoliniLogoSecondary from '../../../assets/polini-logo-secondary.png';
import { ColorModeContext } from '../../../context/ColorModeContext';
import { accountItems, menuItems, adminItems } from './Items';
import { MyButton, MyTypography } from '../../custom/previewComponents';
import Settings from './UserSettings';
import MobileMenu from './MobileMenu';
import API from '../../../constants/api/API';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../../store';
import userActions from '../../../actions/userActions';
import UserSettings from './UserSettings';
import Menu from './Menu';
import Sidebar from '../../admin/Sidebar';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';


function HideOnScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined
    })

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};




const Header = ({ isAuthenticated, user, loading }) => {

    const { mode, toggleColorMode } = useContext(ColorModeContext);

    // const {isAuthenticated, user, loading } = useSelector(state => state.user);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     isAuthenticated && store.dispatch(userActions.getAccount());        
    // },[]);


    const [anchorMenu, setAnchorMenu] = useState(false);

    const [adminMenu, setAdminMenu] = useState(false);



    const [expandedAccordion, setExpandedAccordion] = useState(false);



    // const handleAccordionChange = (panel) => (e, isExpanded) => {
    //     setExpandedAccordion(isExpanded ? panel : false);
    // };

    const TypographyHeader = (element, sx, variant) => (
        <MyTypography section="header" variant={variant} element={element} sx={sx} />
    );


    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpandedAccordion(isExpanded ? panel : false);
    };

    const toggleMenu = e => {
        if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
            return;
        }
        setAnchorMenu(!anchorMenu);
    }

    const toggleAdminMenu = e => {
        if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
            return;
        }
        setAdminMenu(!adminMenu);
    }

    const navigate = useNavigate();

    ;
    const isAdmin = user && user.role === "admin";
    const isSupervisor = user && user.role === "supervisor";



    return (
        <HideOnScroll>
            <AppBar sx={{ display: "flex", width: "100%", py: 1, px: 0 }}>
                <Toolbar sx={{ px: "0!important" }}>





                    <Container maxWidth="xl"
                        sx={{
                            display: "flex",
                            direction: "row", flexWrap: "nowrap",
                            alignItems: "center",
                            px: "8px!important"
                        }}>

                        <Box sx={{ mr: "auto", cursor: "pointer", display: "flex", alignItems: "center" }}>

                            <Box component="img" sx={{ width: "130px", height: "40px", }}
                                src={mode === "light" ? PoliniLogoPrimary : PoliniLogoSecondary}
                                alt="polini-logo"
                                onClick={() => navigate(API.paths.app.home)}
                            />




                        </Box>

                        {/* ADMIN MENU */}

                        {isAdmin &&
                            (!loading ?
                                <Box sx={{ mx: "auto" }}>
                                    <Button color='toggledPrimarySecondary' sx={{ p: 1.5 }} onClick={toggleAdminMenu}>
                                        <AdminPanelSettingsIcon />
                                    </Button>
                                </Box> :

                                <Skeleton sx={{ width: "60px", height: "60px", mx: "auto" }} />)
                        }

                        <Box sx={{ display: isAdmin ? "flex" : "none" }}>
                            <Drawer
                                anchor="left"
                                open={adminMenu}
                                onClose={toggleAdminMenu}
                                // sx={{backgroundImage:"linear-gradient("}}
                                sx={{
                                    '& .MuiDrawer-paper': {
                                        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));"
                                    }
                                }}
                            >
                                {<Sidebar
                                    adminItems={adminItems}
                                    toggleAdminMenu={toggleAdminMenu} />}

                            </Drawer>
                        </Box>

                        {/* {isAdmin &&
                            <Box>
                                <Button color='toggledPrimarySecondary' sx={{ p: 1.5 }} onClick={toggleAdminMenu}>
                                    <SupervisorAccountIcon />
                                    Supervisor Panel
                                </Button>
                            </Box>
                        } */}

                        {/* <Box sx={{display:"flex"}}>
                            <Drawer anchor="left"
                            open={adminMenu}
                            onClose={toggleAdminMenu}
                            >
                            {
                                <Sidebar adminItems={adminItems} toggleAdminMenu={toggleAdminMenu} />
                            }

                            </Drawer>
                        </Box> */}

                        {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Пребарувај.."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> */}

                        {/* MENU LARGE DEVICES*/}

                        <Menu menuItems={menuItems} adminItems={adminItems} user={user} toggleMenu={toggleMenu} />



                        {/* MOBILE MENU */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: "auto" }}>


                            <Button
                                onClick={toggleMenu}
                                color="toggledPrimarySecondary"
                                size="large"
                                sx={{ p: 2, mr: { xs: 4, md: 0 } }}>
                                <CategoryIcon />
                            </Button>

                            <Drawer
                                anchor='top'
                                open={anchorMenu}
                                onClose={toggleMenu}

                            >

                                {<MobileMenu
                                    menuItems={menuItems}
                                    adminItems={adminItems}
                                    user={user}
                                    toggleMenu={toggleMenu}
                                />}
                            </Drawer>

                        </Box>
                        {!loading ?
                            <Box sx={{ position: "relative", ml: "auto", }}>

                                {<UserSettings user={user} isAuthenticated={isAuthenticated} loading={loading} />}

                            </Box>

                            :
                            <Box sx={{ position: "relative", ml: "auto", }}>
                                <Skeleton sx={{ height: "50px", width: "50px", borderRadius: "50%", transform: "scale(1)", position: "absolute", top: -25, right: 0 }} />
                            </Box>
                        }
                    </Container>









                </Toolbar>

            </AppBar >
        </HideOnScroll >
    );
};

export default Header;