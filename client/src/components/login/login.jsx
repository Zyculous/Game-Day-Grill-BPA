import React from 'react';
import style from './login.module.css';

function Login() {
    function handleSubmit(e){
        localStorage.setItem('account', JSON.stringify({ email: e.target.email.value, password: e.target.password.value, firstName: e.target.firstName.value, lastName: e.target.lastName.value, address: e.target.address.value, phone: e.target.phone.value}));
        window.location.href = "/account";
        e.preventDefault();
    }
    return (
        <div className={style.mainDiv}>
            <h1>Login</h1>
            <form className={style.form} onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input className={style.txtInput} type="text" id="email" name="email" required/>
                <br></br>
                <label htmlFor="password">Password:</label>
                <input className={style.txtInput} type="password" id="password" name="password" required/>
                <br></br>
                <button className={style.button} type="submit">Login</button>
            </form>
            <h2>Need an account?</h2>
            <button className={style.signup} onClick={() => window.location.href = "/signup"}>Sign Up</button>
        </div>
    );
};

export default Login;
