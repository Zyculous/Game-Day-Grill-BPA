import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Menu from './components/menuBuilding/menu.jsx';
import NavBar from './components/navbar/navBar.jsx';
import Home from './components/home-page/home.jsx';
import Cart from './components/cart/cart.jsx';

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
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={HomePage()} />
                    <Route path="/menu" element={MenuPage()} />
                    <Route path="/cart" element={CartPage()} />
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;