import "./App.css";
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from './store';
import API from "./constants/api/API";
import Header from "./components/layout/header/Header";
import Home from './components/container/home/Home';
import Products from './components/container/product/Products';
import ProductDetails from './components/container/product/ProductDetails'
import Login from './components/container/user/Login';
import Register from './components/container/user/Register';
import NotFound from "./components/layout/notfound/NotFound";
import Footer from "./components/layout/footer/Footer";
import userActions from './actions/userActions';
import localStorageHelper from "./helpers/localStorageHelper";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Dashboard from "./components/admin/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Account from "./components/container/user/Account";
import Storage from "./constants/storage";
import NotLogged from "./components/container/user/NotLogged";
import PasswordUpdate from "./components/container/user/PasswordUpdate";
import Cart from "./components/container/cart/Cart";
import Checkout from "./components/container/cart/Checkout";
import ProductsList from "./components/admin/ProductsList";
import Charts from "./components/admin/Charts";
import UsersList from "./components/admin/UsersList";
import OrdersList from "./components/admin/OrdersList";
import UpdateProduct from "./components/admin/UpdateProduct";
import hashHelper from "./helpers/hashHelper";
import AddProduct from "./components/admin/AddProduct";





const App = (props) => {
    const { isAuthenticated, user, loading } = useSelector(state => state.user);

    const [AUTH, setAUTH] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        !localStorageHelper.exists(Storage.AUTH) && localStorageHelper.saveItem(Storage.AUTH, false);
        setAUTH(localStorageHelper.getItem(Storage.AUTH));
        AUTH && store.dispatch(userActions.getAccount());
    }, [AUTH])



    return (
        <Router>
            <Header isAuthenticated={isAuthenticated} user={user} loading={loading} />
            <Routes>

                <Route path={"*"} element={<NotFound />} />
                {/* <UserRoutes isAuthenticated={isAuthenticated} user={user} loading={loading} />
            <AdminRoutes isAuthenticated={isAuthenticated} user={user} loading={loading} /> */}
                <Route path={API.paths.app.home} element={<Home />} />
                <Route path={API.paths.app.login} element={<Login />} />
                <Route path={API.paths.app.register} element={<Register />} />
                <Route exact path={API.paths.app.not_logged} element={<NotLogged />} />
                <Route path={API.paths.app.products} element={<Products />} />
                <Route path={API.paths.app.productsQuery} element={<Products />} />
                <Route path={API.paths.app.productId} element={<ProductDetails />} />
                <Route path={API.paths.app.cart} element={<Cart />} />


                {/* USER */}
                <Route exact path={API.paths.app.account} element={
                    <ProtectedRoute>
                        <Account />
                    </ProtectedRoute>
                } />
                <Route exact path={API.paths.app.password.update} element={
                    <ProtectedRoute>
                        <PasswordUpdate />
                    </ProtectedRoute>
                } />

                <Route exact path={API.paths.app.checkout} element={
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                } />






                {/* ADMIN */}
                <Route exact path={API.paths.admin.dashboard} element={
                    <ProtectedRoute isAdmin>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route exact path={API.paths.admin.charts} element={
                    <ProtectedRoute isAdmin>
                        <Charts />
                    </ProtectedRoute>
                } />
                <Route exact path={API.paths.admin.products} element={
                    <ProtectedRoute isAdmin>
                        <ProductsList />
                    </ProtectedRoute>
                } />
                <Route exact path={API.paths.admin.product_id} element={
                    <ProtectedRoute isAdmin>
                        <UpdateProduct />
                    </ProtectedRoute>
                } />
                <Route exact path={API.paths.admin.product_new} element={
                    <ProtectedRoute isAdmin>
                        <AddProduct />
                    </ProtectedRoute>
                } />
                <Route exact path={API.paths.admin.users} element={
                    <ProtectedRoute isAdmin>
                        <UsersList/>
                    </ProtectedRoute>
                } />
                <Route exact path={API.paths.admin.orders} element={
                    <ProtectedRoute isAdmin>
                        <OrdersList />
                    </ProtectedRoute>
                } />
            </Routes>
             <Footer />
            
        </Router>

    );
};

export default App;