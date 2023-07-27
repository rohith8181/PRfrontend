import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from "axios";
import Login from './components/authcomponent/Login';
import Signup from './components/authcomponent/Signup';
import Home from './components/Homepage/Home';
import Userspreview from './components/Userspreview/Userspreview';
import Notificationspreview from './components/Notificationspage/Notificationspreview';
import Petitionpreview from './components/Petitions/Petitionpreview';
import Academichelppreview from './components/AcademicHelp/Academichelppreview';
import Page404 from './components/Page404/Page404';
import FullQandA from './components/FullPages/FullQandA';
import UserFullcard from './components/Userspreview/UserFullcard';
import Verifymail from './components/authcomponent/Verifymail';
import ProtectedRoute from './components/authcomponent/ProtectedRoute';
import AcadmicFullPage from './components/FullPages/AcadmicFullPage';
import PetitionFullPage from './components/FullPages/PetitionFullPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Admin from './components/Admin/Admin';
import Team from './components/Team/Team';
import AdminLogin from './components/Admin/AdminLogin';
import { BASE_URL } from '../../helper'


export const AdminProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const Adminexists = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/request/verifyauth`, {
                headers: {
                    "x-access-token": Cookies.get("Admintoken"),
                }
            });
            if (data.auth) {
                setIsLoggedIn(true);
            }
            else {
                setIsLoggedIn(false);
                navigate('/admin/login', { replace: true });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        Adminexists();
    }, [isLoggedIn]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}

const RoutesComponent = () => {

    return (
        <div>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/admin/login' element={<AdminLogin />} />
                <Route path='/admin' element={
                    <AdminProtectedRoute>
                        <Admin />
                    </AdminProtectedRoute>
                } />
                <Route path='/team' element={
                    <ProtectedRoute>
                        <Team />
                        <Footer />
                    </ProtectedRoute>
                } />
                <Route path='/home' element={
                    <ProtectedRoute>
                        <Navbar />
                        <Home />
                        <Footer />
                    </ProtectedRoute>
                } />
                <Route path='/users' element={
                    <ProtectedRoute>
                        <Navbar />
                        <Userspreview />
                        <Footer />
                    </ProtectedRoute>
                } />
                <Route path='/notifications' element={
                    <ProtectedRoute>
                        <Navbar />
                        <Notificationspreview />
                        <Footer />
                    </ProtectedRoute>
                } />
                <Route path='/academichelp' element={
                    <ProtectedRoute>
                        <Navbar />
                        <Academichelppreview />
                        <Footer />
                    </ProtectedRoute>
                } />
                <Route path='/petitions' element={
                    <ProtectedRoute>
                        <Navbar />
                        <Petitionpreview />
                        <Footer />
                    </ProtectedRoute>
                } />
                <Route path='/question/:id' element={
                    <ProtectedRoute>
                        <Navbar />
                        <FullQandA />
                        <Footer />
                    </ProtectedRoute>
                } />
                <Route path='/user/:id' element={
                    <ProtectedRoute>
                        <Navbar />
                        <UserFullcard />
                        <Footer />
                    </ProtectedRoute>
                } />
                <Route path='/verify/:token' element={<Verifymail />} />
                <Route path='/post/:id' element={
                    <ProtectedRoute>
                        <Navbar />
                        <AcadmicFullPage />
                        <Footer />
                    </ProtectedRoute>
                } />
                <Route path='/petition/:id' element={
                    <ProtectedRoute>
                        <Navbar />
                        <PetitionFullPage />
                        <Footer />
                    </ProtectedRoute>
                } />
                <Route path='*' element={
                    <ProtectedRoute>
                        <Navbar />
                        <Page404 />
                        <Footer />
                    </ProtectedRoute>
                } />
            </Routes>
        </div>
    )
}

export default RoutesComponent;