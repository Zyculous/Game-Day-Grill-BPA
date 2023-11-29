import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './resMainPage.module.css';

function ReservationPage(){
    const [reservations, setReservations] = useState([]);
    const [today, setToday] = useState(new Date());
    const [formatToday, setFormatToday] = useState(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
    const [date, setDate] = useState(new Date());

    //account data
    const account = localStorage.getItem('account');
    const { email, firstName, lastName, address, phone } = account ? JSON.parse(account) : {};

    function makeReservation(reservation){
        setReservations([...reservations, reservation]);
    };

    function handleDate(v){
        console.log(v);
        let val = v.target.value;
        let time = val.split('T')[1];
        let hour = time.split(':')[0];
        let suffix;
        if(hour >= 12){ 
            suffix = " PM"
            hour = hour - 12;
        } else { 
            suffix = " AM"
        }
        let mins = time.split(':')[1];
        time = " " + hour + ":" + mins + suffix;
        let date = val.split('T')[0].split('-');
        let year = date[0];
        let month = date[1];
        let day = date[2];
        date = month + "/" + day + "/" + year;
        setDate(date + time)

    }

    function checkReservations(){
        if (reservations.length > 0) {
            return (
                <div>
                    <h2>Existing Reservations:</h2>
                    <ul>
                        {reservations.map((reservation, index) => (
                            <div>
                                <li key={index}>{reservation.firstName} {reservation.lastName} - {reservation.dateTime} - {reservation.numPeople} - {reservation.location} - {reservation.phoneNum}</li>
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
            todayDate: formatToday,
            dateTime: date,
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
                <input type="text" name="firstName" placeholder="First Name" defaultValue={firstName} required/>
                <br></br>
                <input type="text" name="lastName" placeholder="Last Name" defaultValue={lastName} required/>
                <br></br>

                <input type="datetime-local" name="dateTime" placeholder="Start Time" onChange={value => handleDate(value)} required/>
                <br></br>
                <input type="number" name="numPeople" placeholder="Number of People" required/>
                <br></br>
                <input type="email" name="email" placeholder="Email" defaultValue={email} required/>
                <br></br>
                <input type="phone" name="phoneNum" placeholder="Phone Number" defaultValue={phone} required/>
                <br></br>
                <label>Location: </label>
                <select name='location' required>
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
