import React, { useState } from 'react';
import styles from './signUp.module.css';

const submitURL = "https://www.gamedaygrill.site/signup";

function SignUp() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });
     
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function handleSubmit(e){
        e.preventDefault();

        let res = await fetch(submitURL, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...form})
        });

        if (res.status != 204) {
            window.alert(await res.text());
            return;
        }

        localStorage.setItem('account', JSON.stringify({ 
            email: form.email == "" ? null : form.email, 
            password: form.password, 
            username: form.username
        }));
        window.location.href = '/account';
        
    }
    return (
        <div className={styles.mainDiv}>
            <h1>Sign Up</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor='username'>Username: </label>
                <input onChange={(e) => updateForm({ username: e.target.value })} className={styles.txtInput} type='text' id='username' name='username' value={form.username} pattern='^[A-Za-z0-9]{4,16}$' title='4-16 alphanumeric characters' required/>
                <br></br>
                <label htmlFor="email">Email:</label>
                <input onChange={(e) => updateForm({ email: e.target.value })} className={styles.txtInput} type="text" id="email" name="email" value={form.email} pattern='^[^\s]+[^\s]+\.[^\s]+$' title='is valid email format'/>
                <br></br>
                <label htmlFor="password">Password:</label>
                <input onChange={(e) => updateForm({ password: e.target.value })} className={styles.txtInput} type="password" id="password" name="password" value={form.password} pattern='^[^\s]{8,}$' title='8 or more non-whitespace characters' required/>
                <br></br>
                <button className={styles.button} type="submit">Sign Up</button>
            </form>
            <h2>Already have an account?</h2>
            <button className={styles.login} onClick={() => window.location.href = "/login"}>Login</button>
        </div>
    );
};

export default SignUp;
