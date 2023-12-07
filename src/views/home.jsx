import React from 'react';
import DefaultLayout from './layouts/default.jsx';
import styles from './styles/home.module.css';
import content from './content/home.json';

const Home = () => (
    <DefaultLayout title="Home">
        <div>
            <img className={styles.image} alt="Inside Grill" src="https://images.squarespace-cdn.com/content/v1/59950f7ee3df28b72af87b70/1675458881018-BBQRS2ID0V7UQFHS63C6/Bar_01.jpg?format=2500w"/>
            <div className={styles.imgContent}><h1>Game Day <br></br>Grill</h1></div>
            <div className={styles.content}>
                <div className={styles.cardOuter}>
                    <img src={content.cardImgSrc} className={styles.circle} alt={content.cardImgAlt || "no description"}></img>
                    <div className={styles.cardInner}>
                        <h1>{content.cardTitle}</h1>
                        <h2>{content.cardSubtitle}</h2>
                        <p>{content.cardText}</p>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
);

export default Home;