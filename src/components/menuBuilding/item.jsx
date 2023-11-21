import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import Options from '../menuBuilding/options';
import styles from "./item.module.css";

function Item(props) {
    const { name, description, price, options, subtype, src } = props;
    const [open, setOpen] = useState(false);
    const [selectedSubtype, setSelectedSubtype] = useState(subtype ? subtype[0] : null);
    const [numInCart, setNumInCart] = useState(0);
    const closeModal = () => setOpen(false);

    function addToCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemOptions = JSON.parse(localStorage.getItem({name})) || [];
        const amount = 1;
        
        const newItem = { name, description, price, src, itemOptions, amount, selectedSubtype };
        const updatedCart = [...cartItems, newItem];
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        closeModal();
        setNumInCart(numInCart + 1);
        localStorage.setItem('numInCart', JSON.stringify(numInCart));
    }

    function handleClick(){
        localStorage.removeItem({name});
        if(options){
            setOpen(o => !o);
        }else{
            addToCart();
        }
    }

    return (
        <div className={src ? styles.card:styles.smallCard} onClick={handleClick}>
            <div>
            {src && <img src={src} className={styles.img} alt= {name} />}
            <p className={styles.foodName}>{name}</p>
            <p className={styles.foodDesc}>{description}</p>
            </div>
            <button className={styles.btn}>{options ? `view item` : `add to cart`}</button>
            {options ? <Popup open={open} onClose={closeModal} id={name} modal>
                <div className={styles.popup}>
                    <a className="close" onClick={closeModal}>
                        &times;
                    </a>
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
                    {subtype ? <>
                        <label className={styles.subtype} htmlFor="subtype">Count:</label>
                            <select className={styles.subtype} id="subtype" onChange={(e) => setSelectedSubtype(e.target.value)}>
                                {subtype.map((c, i) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </> : null}
                    </div>
                    <button onClick={addToCart}>Add to cart</button>
                </div>
            </Popup>: null}
        </div>
    );
}

export default Item;
