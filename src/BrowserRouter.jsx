import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Menu from './components/menuBuilding/menu.jsx';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={Menu()} />
                    <Route path="/menu" element={Menu()} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;