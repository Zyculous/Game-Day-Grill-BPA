import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './resMainPage.module.css';

const getReservationsURL = "https://www.gamedaygrill.site/reservations/getReservations";
const createReservationURL = "https://www.gamedaygrill.site/reservations/createReservation";
const deleteReservationURL = "https://www.gamedaygrill.site/reservations/deleteReservation";

function ReservationPage(){
    const account = JSON.parse(localStorage.getItem('account'));

    let [reservations, setReservations] = useState([]);

    useEffect(() => {
        if (account == null) {
            return;
        }

        async function getReservations() {
            let res = await fetch(getReservationsURL, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(account)
            });

            if (res.status != 200) {
                alert(`Failed to load reservations with error: ${res.text}`);
                return;
            }

            setReservations(await res.json());
        }

        getReservations();

        return;
    }, [reservations.length]);

    const [form, setForm] = useState({
        name: "",
        date: "",
        people: 0,
        location: "Downtown",
    });
     
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    function handleDate(val){
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
        return date + time;
    }

    async function handleDelete(e, reservation) {
        
        let result = await fetch(deleteReservationURL, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...account, _id: reservation._id })
        });

        if (result.status != 200) {
            window.alert(await result.text());
            return;
        }

        window.location.reload();
    }

    function checkReservations(){
        if (account == null) {
            return <p>Sign into an account to see your reservations.</p>;
        }

        if (reservations.length == 0) {
            return <p>No reservations made yet.</p>;
        }

        return (
            <div>
                <h2>Existing Reservations:</h2>
                <ul>
                    {reservations.map((reservation) => (
                        <div>
                            <li key={reservation._id}>{reservation.name} - {handleDate(reservation.date)} - {reservation.people} - {reservation.location}</li>
                            <button onClick={(e) => handleDelete(e, reservation)}>Cancel Reservation</button>
                        </div>
                    ))}
                </ul>
            </div>
        );
    };

    async function handleSubmit(e){
        e.preventDefault();

        if (account == null) {
            alert('Please sign into an account to make a reservation.');
            return;
        }

        let res = await fetch(createReservationURL, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...account, ...form })
        });

        if (res.status != 204) {
            window.alert(await res.text());
            return;
        }

        window.location.reload();
    };

    return (
        <div className={styles.mainDiv}>
            <h1 style={{fontFamily:'Audiowide'}}>Reservation Page</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.innerDiv}>
                    <label>Name: </label>
                    <input onChange={(e) => updateForm({ name: e.target.value })} className={styles.txtInput} type='text' id='name' name='name' value={form.name} required/>
                    <br></br>
                    <label>Time & Date: </label>
                    <input onChange={(e) => updateForm({ date: e.target.value })} className={styles.txtInput} type="datetime-local" name="dateTime" placeholder="Start Time" value={form.date} step={1} min={1} required/>
                    <br></br>
                    <label>Number of People: </label>
                    <input onChange={(e) => updateForm({ people: e.target.value })} className={styles.txtInput} type="text" inputMode='numeric' name="numPeople" value={form.people} pattern='\d{1,2}' title='up to two digit number' required/>
                    <br></br>
                    <label>Location: </label>
                    <select onChange={(e) => updateForm({ location: e.target.value })} className={styles.txtInput} name='location' value={form.location} required>
                        <option value="Downtown">Downtown</option>
                        <option value="Uptown">Uptown</option>
                        <option value="Midtown">Midtown</option>
                    </select>
                    <br></br>
                </div>
                <button className={styles.btn} type="submit">Make Reservation</button>
            </form>
            <div className={styles.resList}>
                {checkReservations()}
            </div>
        </div>
    );
};

export default ReservationPage;
