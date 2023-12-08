import React, { useEffect, useState, useReducer } from 'react';
import Item from './item';
import styles from './category.module.css';

function Category({ category, items }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const minColWidth = 360;

    let numCols = -1;

    let columns = [];
    
    function updateColumns() {
        let nextCols = Math.max(1, Math.floor(window.innerWidth / minColWidth));
        if (nextCols === numCols) { return; }
        numCols = nextCols;

        columns = [];
        for (let i = 0; i < numCols; i++) {
            columns.push({height: 0, items: []});
        }

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const src = item.src;
            let min = columns[0].height;
            let minIndex = 0;
            for (let j = 0; j < numCols; j++) {
                if (columns[j].height < min) {
                    min = columns[j].height;
                    minIndex = j;
                }
            }
            let itemSize = typeof src === 'undefined' ? 1 : 2;
            columns[minIndex].height += itemSize;
            columns[minIndex].items.push(item);
        }
    }

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    updateColumns();

    useEffect(() => {
        function handleResize() {
            forceUpdate()
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });

    return (
        <div>
            <div onClick={toggleCollapse} className={styles.sectionTitle} onResizeCapture={updateColumns}>
                <h3>{category} {isCollapsed ? <span>&#x25B6;</span> : <span>&#x25BC;</span>}</h3>
            </div>
            {!isCollapsed && (
                <div className={styles.largeDiv}>
                    {columns.map((column, i) => (
                        <div className={styles.column} key={column + i}>
                            {column.items.map((item) => (
                                <Item
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                options={item.options}
                                key={item.name}
                                src={item.src}
                                subtype={item.subtype}
                            ></Item>))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Category;
