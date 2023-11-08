import React, { useState, useEffect } from 'react';
import Item from './item';
import styles from './subcategory.module.css';

function Column({ items }) {
    console.log(items)

    const numCols = 2;

    let columns = [];
    for (let i = 0; i < numCols; i++) {
        columns.push({height: 0, items: []});
    }

    

    /*const columns = [[],[]];
    const [col1Height, setCol1Height] = useState(0);
    const [col2Height, setCol2Height] = useState(0);
    const [smallerCol, setSmallerCol] = useState(0);

    function addColHeight(add){
        if(smallerCol === 0){
            setCol1Height(col1Height + add);
        }else{
            setCol2Height(col2Height + add);
        }
    }

    useEffect(() => {
        setSmallerCol(col1Height <= col2Height ? 0 : 1);
    }, [col1Height, col2Height]);

    let content;
    Object.entries(items).forEach(([item, itemTraits], index) => {
        //itemTraits.src ? addColHeight(1) : addColHeight(2);
        columns[smallerCol].push(item, itemTraits);
    });*/


    return (
        <div className={styles.column}>
            {Object.entries(items).map(([item, itemTraits], index) => (
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
    );
}

export default Column;
