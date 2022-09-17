import React, {useEffect, useState} from 'react';
import { Box, Divider, Grid, SvgIcon, Typography } from '@mui/material';
import { MyDivider, MyTextField, MyButton } from '../../custom/previewComponents';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../../../actions/userActions';
import Loader from '../../layout/loader/Loader';
import { useNavigate } from 'react-router-dom';
import API from '../../../constants/api/API';
import User from '../../../constants/user';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import timeoutHelper from '../../../helpers/timeoutHelper';
import Text from '../../custom/Text';

const AcountDetailsUpdate = ({ setOnUpdate, setMessageData}) => {

  const {user} = useSelector(state => state.user);

  const {isUpdated, loading, error, message} = useSelector(state => state.account);
  
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [credentials,setCredentials] = useState({
    name: "",
    email:"",
    phone:"",
    avatar: {},
});
  const {name, email, phone, avatar} = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({ ...prevState, [name]: value }));
};

const handleUpdateAccount = () => {
  dispatch(userActions.updateAccount(credentials));
}

const handleAvatar = () => {

}

useEffect(() => {
    if(user) {
    setCredentials({
      name: user.name,
      email:user.email,
      phone:user.phone
    });
  };

  if(error) {
    alert(error);
    setMessageData({Message:error, HasError:true})
    dispatch(userActions.clearErrors());
  };

  if(isUpdated) {
    setOnUpdate(false);
    dispatch({type:User.UPDATE_ACCOUNT_RESET});
    dispatch(userActions.getAccount());
    setMessageData({Message:message});
  }
  if(!isUpdated) {
    timeoutHelper(() => {setMessageData({})},5000);
  }

}, [dispatch, user, isUpdated, loading, error])

    return (
      loading ? <Loader openLoader={loading}/>
      :
      <>
      <Grid item md={6} xs={12} sx={{display:"flex", mx:"auto", my:2}}>
        <Box
         sx={{position:"relative", width: "250px", height: "250px", border:"2px solid purple", borderRadius: "50%", mx:"auto", cursor:"pointer"}}>

      <SvgIcon sx={{position:"absolute", top:30, left:30, width:"180px", height:"180px"}}
     >
        <AddAPhotoIcon color="toggledPrimarySecondary"/>
       
                
        <input style={{ width:"250px", height:"250px", zIndex:1000}} type="file" accept="image/*" onChange={handleAvatar} />

       
             
                {/* <Text section="register" element={avatar === "" ? "avatar" : "avatar_success"}/> */}
                
              </SvgIcon>
              </Box>
            
        </Grid>

        <Grid item md={6} xs={12} sx={{ m: "auto" }}>

        <Grid item xs={12}>
           <MyTextField 
           section="account"
           element="name"
           required
           name="name"
           value={name}
           onChange={handleChange}
           />
          <MyDivider sx={{my:1}}/>
        </Grid>

        <Grid item xs={12}>
          <MyTextField 
          section="account"
          element="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
          />
          <MyDivider sx={{my:1}}/>
        </Grid>
        <Grid item xs={12}>
          <MyTextField 
          section="account"
          element="phone"
          value={phone}
          required
          name="phone"
          onChange={handleChange}
          />
          <MyDivider sx={{my:1}}/>
        </Grid>

        <Grid item lg={4} xs={12} sx={{my:2, pr:2}}>

        <MyButton section="account" element="save" variant="outlined" onClick={handleUpdateAccount}  sx={{width:"100%"}}/>
        </Grid>


    </Grid>
          </>
    );
};

export default AcountDetailsUpdate;