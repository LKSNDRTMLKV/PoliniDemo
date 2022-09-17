import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import API from '../constants/api/API';
import Storage from '../constants/storage';
import localStorageHelper from '../helpers/localStorageHelper';

const ProtectedRoute = ({ isAdmin, children }) => {

    const { loading, isAuthenticated, user } = useSelector(state => state.user);

    

    const AUTH = localStorageHelper.getItem(Storage.AUTH);

    if (!AUTH) {
        return <Navigate to={API.paths.app.login} />
    }
    else {
        // if(!loading && (isAdmin && user.role !== "admin")) {
        //      return <Navigate to={API.paths.app.restricted} />
        // }
        
            return children;
        
    }




};

export default ProtectedRoute;