import React, { useEffect, useState, useReducer } from 'react';
import {Dimensions} from 'react-native';
import Item from './item';
import styles from './subcategory.module.css';
import Column from './column';

function Category({ category, items }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const minColWidth = 360;

    let numCols = -1;

    let columns = [];
    
    function updateColumns() {
        let nextCols = Math.max(1, Math.floor(Dimensions.get('window').width / minColWidth));
        if (nextCols == numCols) { return; }
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
                    //console.log("smaller " + columns[j].height)
                }
                //console.log("Index: " + j + " Height: " + columns[j].height);
            }
            //console.log(columns)
            let itemSize = typeof src === 'undefined' ? 1 : 2;
            //console.log("MinIndex: " + minIndex + " SrcNum: " + itemSize)
            columns[minIndex].height += itemSize;
            columns[minIndex].items.push(item);
        }
    }

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    updateColumns();

    //window.addEventListener('resize', updateColumns);


    useEffect(() => {
        function handleResize() {
            //console.log("resize");
            {forceUpdate()}
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });
    /*const columns = [];

    items.map(item => {
        columns.push(item);
    });*/

    return (
        /*<div>
            <div onClick={toggleCollapse} style={{ cursor: 'pointer' }}>
                <h3>{category} {isCollapsed ? <span>&#x25B6;</span> : <span>&#x25BC;</span>}</h3>
            </div>
            {!isCollapsed && (
                <div className={styles.largeDiv}>
                    <Column items={columns}></Column>
                </div>
            )}
        </div>*/
        <div>
            <div onClick={toggleCollapse} style={{ cursor: 'pointer' }} onResizeCapture={updateColumns}>
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
                                sauces={item.sauces}
                                meats={item.meats}
                                key={item.name}
                                src={item.src}
                            ></Item>))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Category;
