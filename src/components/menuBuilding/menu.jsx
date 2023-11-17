import React from 'react';
import menu from './menu.json';
import Category from './category';

const menuData = Object.entries(menu);

function Menu() {
    return (
        <div style={{position:"relative", top:"1.5vw"}}>
            <h1>Menu</h1>
                {menuData.map(([category, subcategories]) => (
                    <Category category={category} items={subcategories} key={category}></Category>
                ))}
        </div>
    );
}

export default Menu;