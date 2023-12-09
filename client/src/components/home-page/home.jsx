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
            <img className={styles.image} alt="Inside Grill" src= "https://images.squarespace-cdn.com/content/v1/5a8a22c59f8dce86ccc25373/1664507643739-KDQXDM3VVU7LTWCQRKW5/AM+LKM+Opening-29.jpg" />
            <div className={styles.imgContent}>
                <div className={styles.logoDiv}>
                    <img className={styles.leftLogo} src={left}></img>
                    <div>
                        <img className={styles.middleLogo} src={middle}></img>
                        <p className={styles.logoText}>Game Day <br></br>Bar & Grill</p>
                    </div>
                    <img className={styles.rightLogo} src={right}></img>
                </div>
            </div>
            <div className={styles.content}>
                <HomeCard title="About Us" 
                subtitle="At Game Day Grill, we're all about good food, good games, and good times." 
                text="Game Day Grill was founded by three friends who love the atmosphere of both arcades and sports bars, so one had the brilliant idea to merge the two into one place: Game Day Grill. Welcome to a world of video games, sports, and delicious food, as presented by Indiana BPA members Lukin Uhte, Zander Inderstrodt, and Charles Frederick of Richmond High School in Richmond, Indiana in the year 2023-2024. Here, you'll find arcade machines, lots of TVs displaying your favorite sports, and, of course, our scrumptious signature meals, appetizers, and desserts, We hope to see you stop by! " 
                src="https://st2.depositphotos.com/2332949/7873/i/600/depositphotos_78735650-stock-photo-game-arcade-machine-mock-up.jpg" 
                imgPos="left" imgAlt="outside gameday bar and grill"></HomeCard>
            </div>
        </div>
    );
};

export default Home;
