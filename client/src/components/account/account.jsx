import React from 'react';
import styles from './account.module.css';

function Account() {
    const account = localStorage.getItem('account');
    const { username, email } = JSON.parse(account);

    function handleLogout(e){
        localStorage.removeItem('account');
        window.location.href = "/signup";
        e.preventDefault();
    }

    return (
        <div className={styles.mainDiv}>
            <h1>Account Page</h1>
            <div className={styles.innerDiv}>
                <p>Username: {username}</p>
                <p>Email: {email}</p>
                <button className={styles.button} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Account;
