import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Box, SpeedDial, SpeedDialAction, Badge, SpeedDialIcon, useMediaQuery, Skeleton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TranslateIcon from '@mui/icons-material/Translate';
import EditIcon from '@mui/icons-material/Edit';
import { ColorModeContext } from '../../../context/ColorModeContext';
import AlertMessage from '../../../messages/AlertMessage';
import localStorageHelper from '../../../helpers/localStorageHelper';
import { LanguageContext } from '../../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../../constants/api/API';
import userActions from '../../../actions/userActions';
import StellaBossi from '../../../assets/stella-bossi.jpg';
import Text from '../../custom/Text';
import timeoutHelper from '../../../helpers/timeoutHelper';
import Storage from '../../../constants/storage';

const UserSettings = ({ user, isAuthenticated, loading }) => {
    const { mode, toggleColorMode } = useContext(ColorModeContext);
    const { userLanguage, handleLanguageChange } = useContext(LanguageContext);
    const [messageData, setMessageData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {cartItems} = useSelector(state => state.cart);

    const [openSpeedDial, setOpenSpeedDial] = useState(false);

    useEffect(() => {
        // if(!isAuthenticated && messageData !== {}) {
        //     const reset = () => {
        //         setMessageData({});
        //         // dispatch(userActions.clearErrors());
        //     }
        //     timeoutHelper(reset,3000)
    }, [loading])

    const handleLoginLogout = () => {
        if (isAuthenticated) {
            dispatch(userActions.logout());
            // setMessageData({Message: "Logout Success"})
            navigate(API.paths.app.home);
            localStorageHelper.saveItem(Storage.AUTH, false);
        }
        else {
            navigate(API.paths.app.login);
        }
    }


    const settingsTitle = (element) => (
        <Text section="user_settings" element={element} />
    )
    return (
        <SpeedDial
            ariaLabel='settings'
            direction="down"
            sx={[{
                position: "absolute",
                top: -27.5,
                right: 0

            }, mode === "light" ?
                { "button": { backgroundColor: "#0288d1!important", color: "#fff" }, } :
                { "button": { backgroundColor: "#5c237e!important", } }]}
            icon={isAuthenticated ?
                <Box component="img" sx={{ borderRadius: "50%", width: "50px", height: "50px", objectFit: "cover", }} src={user && user.avatar.url} />
                : <SpeedDialIcon />}
            open={openSpeedDial}
            onClick={() => setOpenSpeedDial(prevState => !prevState)}
        >

            <AlertMessage {...messageData} />

            <SpeedDialAction
                icon={<AccountCircle />}
                tooltipTitle={settingsTitle("account")}
                onClick={() => navigate(API.paths.app.account)}
            />
            <SpeedDialAction
                icon={
                    <Badge 
                    badgeContent={cartItems.length}
                    color="error"
                    >
                        <ShoppingCartIcon />
                    </Badge>
            }
                tooltipTitle={settingsTitle("cart")}
                onClick={() => navigate(API.paths.app.cart)}

            />

            <SpeedDialAction
                icon={
                    <Badge
                        badgeContent={4}
                        color="error"
                    >
                        <NotificationsIcon />
                    </Badge>
                }
                tooltipTitle={settingsTitle("notifications")}
                onClick={() => navigate(API.paths.app.notifications)} />

            <SpeedDialAction
                icon={<FavoriteIcon />}
                tooltipTitle={settingsTitle("favourite")}
                onClick={() => navigate(API.paths.app.favourites)}
            />


            <SpeedDialAction
                icon={mode === "light" ? <Brightness3Icon /> : <Brightness7Icon />}
                tooltipTitle={settingsTitle("theme")}
                onClick={toggleColorMode}
            />

            <SpeedDialAction
                icon={<TranslateIcon />}
                tooltipTitle={settingsTitle("language")}
                onClick={handleLanguageChange}
            />


            <SpeedDialAction
                icon={<MailIcon />}
                tooltipTitle={settingsTitle("contact")}
                onClick={() => navigate(API.paths.app.contact)}
            />

            <SpeedDialAction
                icon={isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
                tooltipTitle={isAuthenticated ? settingsTitle("logout") : settingsTitle("login")}
                onClick={handleLoginLogout}
            />

        </SpeedDial>
    );


};

export default UserSettings;