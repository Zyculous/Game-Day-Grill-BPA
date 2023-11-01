import React, { useState } from 'react';
import styles from "./card.module.css";
import Options from '../menuBuilding/options';

function Card(props) {
    const [showPopup, setShowPopup] = useState(false);
    const { name, src, desc, price, options } = props;

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    return (
        <div className={styles.card}>
            <img src={src} className={styles.img} />
            <p className={styles.foodName}>{name}</p>
            <p className={styles.foodDesc}>{desc}</p>
            <button className={styles.btn} onClick={togglePopup}>add to cart</button>

            {showPopup ?
                <div className={styles.popup}>
                    <div className={styles.popupInner}>
                        <h2>{name}</h2>
                        <p>{desc}</p>
                        <ul>
                            {options.map((option, index) => (
                                <li key={index}>{option}</li>
                            ))}
                        </ul>
                        <button className={styles.closeBtn} onClick={togglePopup}>Close</button>
                    </div>
                </div>
                : null
            }
        </div>
    );
}

export default Card;