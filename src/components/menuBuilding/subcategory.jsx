import React, { useState } from 'react';
import styles from './subcategory.module.css';
import Column from './column';

function Category({ category, items }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const columns = [];

    items.map(item => {
        columns.push(item);
    });

    return (
        <div>
            <div onClick={toggleCollapse} style={{ cursor: 'pointer' }}>
                <h3>{category} {isCollapsed ? <span>&#x25B6;</span> : <span>&#x25BC;</span>}</h3>
            </div>
            {!isCollapsed && (
                <div className={styles.largeDiv}>
                    <Column items={columns}></Column>
                </div>
            )}
        </div>
    );
}

export default Category;
