import React, { useState } from 'react';
import Options from '../menuBuilding/options';
import styles from "./item.module.css";

function Item(props) {
    const { name, description, price, options, subtype, src } = props;
    const [open, setOpen] = useState(false);
    const [selectedSubtype, setSelectedSubtype] = useState(subtype ? subtype[0] : null);
    const [numInCart, setNumInCart] = useState(0);



    function addToCart() {
        setOpen(o => !o);
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemOptions = JSON.parse(localStorage.getItem({name})) || [];
        const amount = 1;
        
        const newItem = { name, description, price, src, itemOptions, amount, selectedSubtype };
        let itemExists = false;

        cartItems.forEach(element => {
            if(element.name === newItem.name && element.selectedSubtype === newItem.selectedSubtype && JSON.stringify(element.itemOptions) === JSON.stringify(newItem.itemOptions)){
                element.amount += 1;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                itemExists = true;
            }
        });
        if(!itemExists){
            const updatedCart = [...cartItems, newItem];
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            setNumInCart(numInCart + 1);
            localStorage.setItem('numInCart', JSON.stringify(numInCart));
        }
    }

    function handleClick(){
        localStorage.removeItem({name});
        if(options !== undefined){
            setOpen(o => !o);
        }else{
            addToCart();
            setOpen(o => !o);
        }
    }

    return (
        <div className={styles.card} >
            <div className={styles.overlay} >
                <div onClick={handleClick}>
                {src && <img src={src} className={styles.img} alt= {name} />}
                <p className={styles.foodName}>{name}</p>
                <p className={styles.foodDesc}>{description}</p>
                </div>
                {open ? null : <button className={styles.btn}>{options ? `view item` : `add to cart`}</button>}
            </div>
            {options ? (
                <div
                    className={open ? styles.openMenu : styles.closeMenu}
                    id={name}
                >
                    {Object.entries(options).map(([option, choices]) => (
                        <Options
                            name={option}
                            optionsArray={choices.options}
                            maxChecked={choices.max}
                            key={option}
                            itemName={name}
                        ></Options>
                    ))}
                    <div>
                        {subtype ? (
                            <>
                                <label className={styles.subtype} htmlFor="subtype">
                                    Count:
                                </label>
                                <select
                                    className={styles.subtype}
                                    id="subtype"
                                    onChange={(e) => setSelectedSubtype(e.target.value)}
                                >
                                    {subtype.map((c, i) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </>
                        ) : null}
                    </div>
                    <button className={styles.btn} onClick={addToCart}>
                        Add to cart
                    </button>
                </div>
            ) : null}
        </div>
    );
}

export default Item;
