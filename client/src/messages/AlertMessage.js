import React, { useState, useEffect } from 'react';
import { Alert, Grow, Slide, Snackbar} from '@mui/material';


// const useStyles = makeStyles((theme) => ({
//     paper: {
//       marginTop: theme.spacing(8),
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//     },
//     avatar: {
//       margin: theme.spacing(1),
//       backgroundColor: theme.palette.secondary.main,
//     },
    
//     submit: {
//       margin: theme.spacing(3, 0, 2),
//     },
//     spiner: {
//       marginTop: 50
//     }
//   }));

const AlertMessage = (props) => {

    // const classes = useStyles();

    const { Loading, Message, HasError, HasInfo } = props;

    const [open, setOpen] = useState(false);
    
    const [snackBarAttributes, setSnackBarAttributes] = useState({
      vertical: 'top',
      horizontal: 'right',
      transition: Slide,
    })
    const {vertical,horizontal,transition} = snackBarAttributes;
  
    
    useEffect(() => {
      if (Message) { 
        setOpen(true);
      }
      else {
        setOpen(false);  
      }
      return () => { setOpen(false); }; 
    }, [Message]);   
  
 
  
    function AlertComponent(props) {
      return (
        <Snackbar 
        anchorOrigin={{vertical, horizontal}} 
        open={open} 
        TransitionComponent={transition} 
        autoHideDuration={5000} 
        key={vertical + horizontal} 
        sx={{mt:8, maxWidth:"30%"}}>
            <Alert elevation={6} variant="filled" {...props} />
        </Snackbar>
      )
    }
  
    const PleaseWait = () => {
      return ""; 
    }
  
    const ShowMessage = () => {
      return (
        open && <AlertComponent severity={HasError ? "error" : HasInfo ? "warning" : "success"}>{Message}</AlertComponent>
      )
    }
  
    if (Loading && !open) { 
      return PleaseWait(); 
    }
    return ShowMessage();
};

export default AlertMessage;