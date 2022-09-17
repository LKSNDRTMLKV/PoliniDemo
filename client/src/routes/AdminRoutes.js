import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/admin/Dashboard';
import API from '../constants/api/API';
import ProtectedRoute from './ProtectedRoute';

const AdminRoutes = (props) => {
    const { loading, isAuthenticated, user } = useSelector(state => state.user);

    return (
        <Fragment>
            {/* <Route element={<ProtectedRoute isAdmin isAuthenticated={isAuthenticated} user={user} loading={loading} />}>
                <Route exact path={"/admin/dashboard"} element={<Dashboard />}/>
            </Route> */}
            <Route exact path={API.paths.admin.dashboard} element={<Dashboard />} />
        </Fragment>
    );
};

export default AdminRoutes;