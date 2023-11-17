import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import Options from '../menuBuilding/options';
import styles from "./item.module.css";

function Item(props) {
    const { name, description, price, options, count, src } = props;
    const [open, setOpen] = useState(false);
    const [selectedCount, setSelectedCount] = useState(1);
    const closeModal = () => setOpen(false);
    function addToCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const newItem = { name, description, price, options, count, src, selectedCount };
        const updatedCart = [...cartItems, newItem];
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        closeModal();
    }

    return (
        <div className={src ? styles.card:styles.smallCard} onClick={() => setOpen(o => !o)}>
            <div>
            {src && <img src={src} className={styles.img} alt= {name} />}
            <p className={styles.foodName}>{name}</p>
            <p className={styles.foodDesc}>{description}</p>
            </div>
            <button className={styles.btn}>view item</button>
            <Popup open={open} onClose={closeModal} id={name} modal>
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
                        ></Options>
                    ))}
                    <div>
                    {count ? <>
                        <label className={styles.count} htmlFor="count">Count:</label>
                            <select className={styles.count} id="count" onChange={(e) => setSelectedCount(parseInt(e.target.value))}>
                                {count.map((c, i) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </> : null}
                    </div>
                    <button onClick={addToCart}>Add to cart</button>
                </div>
            </Popup>
        </div>
    );
}

export default Item;
