
import React, {useState} from 'react';
import styles from './navBar.module.css';


function NavBar() {

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
            <div onClick={click('/gbirej')}>do thing</div>
        </nav>
    );
}
export default NavBar;