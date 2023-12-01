import React from 'react';

function Login() {
    function handleSubmit(e){
        localStorage.setItem('account', JSON.stringify({ email: e.target.email.value, password: e.target.password.value, firstName: e.target.firstName.value, lastName: e.target.lastName.value, address: e.target.address.value, phone: e.target.phone.value}));
        window.location.href = "/account";
        e.preventDefault();
    }
    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='firstName'>First Name: </label>
                <input type='text' id='firstName' name='firstName' />
                <br></br>
                <label htmlFor='lastName'>Last Name: </label>
                <input type='text' id='lastName' name='lastName' />
                <br></br>
                <label htmlFor='address'>Address: </label>
                <input type='text' id='address' name='address' />
                <br></br>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" />
                <br></br>
                <label htmlFor='phone'>Phone Number: </label>
                <input type='text' id='phone' name='phone' />
                <br></br>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
                <br></br>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
