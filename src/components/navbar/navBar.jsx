
import React from 'react';
import styles from './navBar.module.css';

function NavBar() {
    return (
        <nav className={styles.navbar}>
                <div><a href="/" style={{ marginRight: '10px' }}>Home</a></div>
                <div><a href="/about" style={{ marginRight: '10px' }}>About</a></div>
                <div><a href="/contact" style={{ marginRight: '10px' }}>Contact</a></div>
                <button>Sign In</button>
        </nav>
    );
}
export default NavBar;