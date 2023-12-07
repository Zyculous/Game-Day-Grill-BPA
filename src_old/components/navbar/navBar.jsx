
import React, {useState} from 'react';
import styles from './navBar.module.css';


function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('account') !== null);
    const [isSignedUp, setIsSignedUp] = useState(localStorage.getItem('account') !== null);


    function click(url) {
        return function(e) {
            e.preventDefault();
            window.location.href = url;
        }
    }

    return (
        <nav className={styles.navbar}>
            <div onClick={click('/')}>Home</div>
            <div onClick={click('/menu')}>Menu</div>
            <div onClick={click('/cart')}>View Cart</div>
            <div onClick={click('/reservations')}>Make Reservations</div>
            {isLoggedIn ? (
                <div onClick={click('/account')}>Account</div>
            ) : isSignedUp ? (<div></div>) : (
                <div onClick={click('/signup')}>Sign Up</div>
            )}
        </nav>
    );
}
export default NavBar;