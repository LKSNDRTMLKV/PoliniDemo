import React, { Fragment, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import API from '../constants/api/API';
import Home from '../components/container/home/Home';
import Products from '../components/container/product/Products';
import ProductDetails from '../components/container/product/ProductDetails'
import NotFound from "../components/layout/notfound/NotFound";
import Login from '../components/container/user/Login';
import Register from '../components/container/user/Register';
import ProtectedRoute from './ProtectedRoute';
import Account from '../components/container/user/Account';
import { useSelector } from 'react-redux';
import Dashboard from '../components/admin/Dashboard';

const UserRoutes = (props) => {

    const { loading, isAuthenticated, user } = useSelector(state => state.user);

    return (
        <Fragment>
            <Route path={API.paths.app.home} element={<Home />} />
            <Route path={API.paths.app.login} element={<Login />} />
            <Route path={API.paths.app.register} element={<Register />} />
            
            <Route path={API.paths.app.products} element={<Products />} />
            <Route path={API.paths.app.productId} element={<ProductDetails />} />

            {/* <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} loading={loading} />}>
                <Route exact path={API.paths.app.account} element={<Account />} />
                <Route exact path={API.paths.admin.dashboard} element={<Dashboard />} />
            </Route> */}

            {/* <Route element={<ProtectedRoute isAdmin isAuthenticated={isAuthenticated} user={user} loading={loading} />}>
                <Route exact path={API.paths.admin.dashboard} element={<Dashboard />} />
            </Route> */}
           
        </Fragment>
    );
};

export default UserRoutes;