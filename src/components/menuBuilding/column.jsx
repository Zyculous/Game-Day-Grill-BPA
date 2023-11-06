import React from 'react';
import Item from './item';
import styles from './subcategory.module.css';

function Column({ items }) {
    console.log(items)
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
