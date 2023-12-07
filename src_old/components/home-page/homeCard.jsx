import React from 'react';
import styles from './imgTypes.module.css';


function HomeCard({ title, subtitle, text, src, imgPos, imgStyle, imgAlt }) {
    let direction = 'row';

        if(imgPos === 'top'){
            direction = 'column';
        }else if(imgPos === 'bottom'){
            direction = 'column-reverse';
        }else if(imgPos === 'left'){
            direction = 'row';
        }else if(imgPos === 'right'){
            direction = 'row-reverse';
        }
        console.log(direction);

    return (
        <div style={{ display: 'flex', flexDirection: direction, alignItems: 'center', backgroundColor: "white" }}>
            <img src={src} className={styles.circle} alt={imgAlt ? imgAlt : "no description"}></img>
            <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <p>{text}</p>
            </div>
        </div>
    );
}

export default HomeCard;
