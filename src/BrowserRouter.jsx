import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Menu from './components/menuBuilding/menu.jsx';
import NavBar from './components/navbar/navBar.jsx';
import Home from './components/home-page/home.jsx';
import Cart from './components/cart/cart.jsx';
import Reservations from './components/reservations/resMainPage.jsx';
import SignUp from './components/signUp/signUp.jsx';
import Account from './components/account/account.jsx';
import Editor from './components/jsonEditor/editor.jsx';

function App() {
        function HomePage() {
        return (
            <>
                {NavBar()}
                {Home()}
            </>
        );
    }
    function MenuPage() {
        return (
            <>
                {NavBar()}
                {<Menu/>}
            </>
        );
    }
    function CartPage() {
        return (
            <>
                {NavBar()}
                {<Cart/>}
            </>
        );
    }
    function ResPage() {
        return (
            <>
                {NavBar()}
                {<Reservations/>}
            </>
        );
    }
    function SignUpPage() {
        return (
            <>
                {NavBar()}
                {<SignUp/>}
            </>
        );
    }
    function AccountPage() {
        return (
            <>
                {NavBar()}
                {<Account/>}
            </>
        );
    }
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={HomePage()} />
                    <Route path="/home" element={HomePage()} />
                    <Route path="/menu" element={MenuPage()} />
                    <Route path="/cart" element={CartPage()} />
                    <Route path="/reservations" element={ResPage()} />
                    <Route path="/signup" element={SignUpPage()} />
                    <Route path="/account" element={AccountPage()} />
                    <Route path="/editor" element={<Editor></Editor>} />
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;