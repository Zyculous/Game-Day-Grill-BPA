import React, { useState, useEffect } from 'react';
import Item from './item';
import styles from './subcategory.module.css'

function Subcategory({ subcategory, items }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const columns = [[], []];
    const [col1Height, setCol1Height] = useState(0);
    const [col2Height, setCol2Height] = useState(0);
    const [smallerColumnIndex, setSmallerColumnIndex] = useState(0);
    const [colTotal, setcolTotal] = useState(0);
    const ite = [];
    
    function addColHeight(addHeight) {
        if (smallerColumnIndex === 0) {
            setCol1Height(col1Height + addHeight);
        } else {
            setCol2Height(col2Height + addHeight);
        }
    }
    function addTotalHeight(addHeight) {
        setcolTotal(colTotal + addHeight);
    }

    useEffect(() => {
        setSmallerColumnIndex(col1Height <= col2Height ? 1 : 0);
    }, [col1Height, col2Height]);

    items.forEach(item => {
        const { name, description, price, options, sauces, meats, src } = item;
        columns[smallerColumnIndex].push(item);
    });
    /*items.forEach(item => {
        console.log(item);
        columns[smallerColumnIndex].push(item);
        addColHeight(item.src ? 1 : 2);
    });*/

    return (
        <div>
            <div onClick={toggleCollapse} style={{ cursor: 'pointer' }}>
                <h3>{subcategory} {isCollapsed ? <span>&#x25B6;</span> : <span>&#x25BC;</span>}</h3>
            </div>
            {!isCollapsed && (
                <div className={styles.largeDiv}>
                    <div className={styles.column}>
                        {Object.entries(columns[0]).map(([item, itemTraits]) => (
                        <Item
                        name={itemTraits.name}
                        description={itemTraits.description}
                        price={itemTraits.price}
                        options={itemTraits.options}
                        sauces={itemTraits.sauces}
                        meats={itemTraits.meats}
                        key={item}
                        src={itemTraits.src}
                    ></Item>
                        ))}
                    </div>
                    <div className={styles.column}>
                        {Object.entries(columns[1]).map(([item, itemTraits]) => (
                        <Item
                        name={itemTraits.name}
                        description={itemTraits.description}
                        price={itemTraits.price}
                        options={itemTraits.options}
                        sauces={itemTraits.sauces}
                        meats={itemTraits.meats}
                        key={item}
                        src={itemTraits.src}
                    ></Item>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Subcategory;
