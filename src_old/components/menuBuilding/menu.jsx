import React from 'react';
import menu from './menu.json';
import Category from './category';
import styles from './menu.module.css';

const menuData = Object.entries(menu);

function Menu() {
    return (
        <div className={styles.imageBackground}>
            <h1>Menu</h1>
                {menuData.map(([category, subcategories]) => (
                    <Category category={category} items={subcategories} key={category}></Category>
                ))}
        </div>
    );
}

export default Menu;