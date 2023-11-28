import React, { useState } from 'react';
import styles from './resMainPage.module.css';

function ReservationPage(){
    const [reservations, setReservations] = useState([]);
    const [today, setToday] = useState(new Date());
    const [formatToday, setFormatToday] = useState(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());

    //account data
        const account = localStorage.getItem('account');
        const { email, firstName, lastName, address, phone } = JSON.parse(account);

    function makeReservation(reservation){
        setReservations([...reservations, reservation]);
    };

    function checkReservations(){
        if (reservations.length > 0) {
            return (
                <div>
                    <h2>Existing Reservations:</h2>
                    <ul>
                        {reservations.map((reservation, index) => (
                            <div>
                                <li key={index}>{reservation.firstName} {reservation.lastName} - {reservation.resDate} - {reservation.startTime} - {reservation.numPeople} - {reservation.location} - {reservation.phoneNum}</li>
                                <button onClick={() => setReservations(reservations.filter((_, i) => i !== index))}>Cancel Reservation</button>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return <p>No reservations made yet.</p>;
        }
    };

    function handleSubmit(e){
        e.preventDefault();
        const reservation = {
            firstName: e.target.elements.firstName.value,
            lastName: e.target.elements.lastName.value,
            resDate: e.target.elements.resDate.value,
            todayDate: formatToday,
            startTime: e.target.elements.startTime.value,
            numPeople: e.target.elements.numPeople.value,
            location: e.target.elements.location.value,
            phoneNum: e.target.elements.phoneNum.value,
        };
        makeReservation(reservation);
        e.target.reset();
    };

    return (
        <div className={styles.mainDiv}>
            <h1>Reservation Page</h1>
            <form className={styles.mainDiv} onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" defaultValue={firstName}/>
                <br></br>
                <input type="text" name="lastName" placeholder="Last Name" defaultValue={lastName}/>
                <br></br>
                <label>Reservation Date: </label>
                <input type="date" name="resDate"/>
                <br></br>
                <input type="time" name="startTime" placeholder="Start Time"/>
                <br></br>
                <input type="number" name="numPeople" placeholder="Number of People" />
                <br></br>
                <input type="email" name="email" placeholder="Email" defaultValue={email}/>
                <br></br>
                <input type="phone" name="phoneNum" placeholder="Phone Number" defaultValue={phone}/>
                <br></br>
                <label>Location: </label>
                <select name='location'>
                    <option value="Downtown">Downtown</option>
                    <option value="Uptown">Uptown</option>
                    <option value="Midtown">Midtown</option>
                </select>
                <br></br>
                <button type="submit">Make Reservation</button>
            </form>
            <div className={styles.mainDiv}>
                {checkReservations()}
            </div>
        </div>
    );
};

export default ReservationPage;
