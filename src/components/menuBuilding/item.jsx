import React from 'react';
import { useState } from 'react';
import Options from '../menuBuilding/options';
import styles from "../card/card.module.css";

function Item(props) {
    const [showPopup, setShowPopup] = useState(false);
    const { name, description, price, options, sauces, meats, src } = props;

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    return (
        <div className={styles.card}>
            <img src={src} className={styles.img} />
            <p className={styles.foodName}>{name}</p>
            <p className={styles.foodDesc}>{description}</p>
            <button className={styles.btn} onClick={togglePopup}>add to cart</button>

            {showPopup ?
                <div className={styles.popup}>
                    <div className={styles.popupInner}>
                        <h2>{name}</h2>
                        <p>{description}</p>
                        <ul>
                        <Options optionsArray={options} maxChecked={2} name="Other"/>
                        </ul>
                        <button className={styles.closeBtn} onClick={togglePopup}>Close</button>
                    </div>
                </div>
                : null
            }
        </div>
    );
}

export default Item;
