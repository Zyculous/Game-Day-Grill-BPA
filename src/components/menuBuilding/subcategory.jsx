import React, { useState } from 'react';
import Item from './item';
import styles from './subcategory.module.css'

function Subcategory({ subcategory, items }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div>
            <div onClick={toggleCollapse} style={{ cursor: 'pointer' }}>
                <h3>{subcategory}</h3>
                {isCollapsed ? <span>&#x25B6;</span> : <span>&#x25BC;</span>}
            </div>
            {!isCollapsed && (
                <div className={styles.largeDiv}>
                    {Object.entries(items).map(([item, itemTraits]) => (
                        <Item
                            name={itemTraits.name}
                            description={itemTraits.description}
                            price={itemTraits.price}
                            options={itemTraits.options}
                            sauces={itemTraits.sauces}
                            meats={itemTraits.meats}
                        ></Item>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Subcategory;
