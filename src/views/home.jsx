import React from 'react';
import Radium, { Style } from 'radium';
import NavBar from './components/navbar.jsx';
import DefaultLayout from './layouts/default.jsx';
import styles from './styles/home.radium.js';
import content from './content/home.json';

const Home = () => (
    <DefaultLayout title="Home">
        <NavBar/>
        <div>
            <Style scopeSelector='*' rules={styles.all}/>
            <img style={styles.image} alt="Inside Grill" src="https://images.squarespace-cdn.com/content/v1/59950f7ee3df28b72af87b70/1675458881018-BBQRS2ID0V7UQFHS63C6/Bar_01.jpg?format=2500w"/>
            <div style={styles.imgContent}>
                <h1 style={styles.title}>Game Day<br/>Grill</h1>
            </div>
            <div style={styles.content}>
                <div style={styles.cardOuter}>
                    <img src={content.cardImgSrc} style={styles.circle} alt={content.cardImgAlt || "no description"}></img>
                    <div style={styles.cardInner}>
                        <h1>{content.cardTitle}</h1>
                        <h2>{content.cardSubtitle}</h2>
                        <p>{content.cardText}</p>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
);

export default Radium(Home);