import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import Options from '../menuBuilding/options';
import styles from "./item.module.css";

function Item(props) {
    const { name, description, price, options, sauces, meats, src } = props;
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    return (
        <div className={src ? styles.card:styles.smallCard} onClick={() => setOpen(o => !o)}>
            <div>
            {src && <img src={src} className={styles.img} />}
            <p className={styles.foodName}>{name}</p>
            <p className={styles.foodDesc}>{description}</p>
            </div>
            <button className={styles.btn}>view item</button>
            <Popup open={open} onClose={closeModal} id={name} modal>
                <div className={styles.popup}>                       
                    {meats && <Options optionsArray={meats} maxChecked={2} name="Meats"/>}
                    {sauces && <Options optionsArray={sauces} maxChecked={2} name="Sauces"/>}
                    {options && <Options optionsArray={options} maxChecked={2} name="Other"/>}
                    <a className="close" onClick={closeModal}>
                        &times;
                    </a>
                </div>
            </Popup>
        </div>
    );
}

export default Item;
