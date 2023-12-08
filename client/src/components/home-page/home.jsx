import React from 'react';
import styles from './home.module.css';
import HomeCard from './homeCard';
import bar from '../../assets/images/Bar_01.png';
import left from '../../assets/images/left_logo.png';
import right from '../../assets/images/right_logo.png';
import middle from '../../assets/images/middle_logo.png';

function Home() {
    return (
        <div>
            <img className={styles.image} alt="Inside Grill" src= {bar} />
            <div className={styles.imgContent}>
                <h1>Game Day </h1>
                <div className={styles.logoDiv}>
                    <img className={styles.leftLogo} src={left}></img>
                    <img className={styles.middleLogo} src={middle}></img>
                    <img className={styles.rightLogo} src={right}></img>
                </div>
                <h1>Grill</h1>
            </div>
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
