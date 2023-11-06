import React from 'react';
import menu from './menu.json';
import Subcategory from './subcategory';

const menuData = Object.entries(menu);

function Menu() {
    return (
        <div>
            <h1>Menu</h1>
                {menuData.map(([category, subcategories]) => (
                    <Subcategory subcategory={category} items={subcategories} key={category}></Subcategory>
                ))}
        </div>
    );
}

export default Menu;