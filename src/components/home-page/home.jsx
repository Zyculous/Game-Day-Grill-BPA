import React from 'react';
import styles from './home.module.css';
import HomeCard from './homeCard';

const Home = () => {
    return (
        <div>
            <img className={styles.image} alt="Inside Grill" src="https://images.squarespace-cdn.com/content/v1/59950f7ee3df28b72af87b70/1675458881018-BBQRS2ID0V7UQFHS63C6/Bar_01.jpg?format=2500w"/>
            <div className={styles.imgContent}><h1>Game Day <br></br>Grill</h1></div>
            <div className={styles.content}>
                <HomeCard title="About Us" 
                subtitle="At Game Day Grill, we're all about good food, good drinks, and good times." 
                text="Whether you're here to watch the game, catch up with friends, or just grab a bite to eat, we've got you covered. So come on in, pull up a chair, and let us take care of the rest." 
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTUqtkZ7VSUGtjDUcM_Si41nIOkBM4NyOCfmEtc4d4DT79v2kyP" 
                imgPos="left" imgAlt="outside gameday bar and grill"></HomeCard>
            </div>
        </div>
    );
};

export default Home;
