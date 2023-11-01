import React from 'react';
import Subcategory from './subcategory';

function Category({ category, subcategories }) {
    return (
        <div>
            <h2>{category}</h2>
                    {Object.entries(subcategories).map(([subcategory, items]) => (
                        <Subcategory subcategory={subcategory} items={items}></Subcategory>
                    ))}
        </div>
    );
}

export default Category;
