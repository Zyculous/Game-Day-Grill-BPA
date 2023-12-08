import React from 'react';
import styles from './account.module.css';

function Account() {
    const account = localStorage.getItem('account');
    const { email, firstName, lastName, address, phone } = JSON.parse(account);

    function handleEdit(e){
        localStorage.setItem('account', JSON.stringify({ email: e.target.email.value, password: e.target.password.value, firstName: e.target.firstName.value, lastName: e.target.lastName.value, address: e.target.address.value, phone: e.target.phone.value }));
        e.preventDefault();
    }
    function handleLogout(e){
        localStorage.removeItem('account');
        window.location.href = "/signup";
        e.preventDefault();
    }

    return (
        <div className={styles.mainDiv}>
            <h1>Account Page</h1>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Delivery address: {address}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Account;
