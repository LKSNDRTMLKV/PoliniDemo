import { Backdrop, CircularProgress, } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import {ColorModeContext} from '../../../context/ColorModeContext';
import {Watch} from 'react-loader-spinner';

const Loader = ({ openLoader, handleClose }) => {
    const [open, setOpen] = useState(false);
    const {mode} = useContext(ColorModeContext);

    useEffect(() => {
        setOpen(openLoader)
    }, [open])

    return (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        >
            <Watch color={mode === "light" ? "#0288d1" : "#6e2aa4"}/>
        </Backdrop>
    );
};

export default Loader;