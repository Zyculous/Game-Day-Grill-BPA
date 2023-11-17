
import React, { useState } from 'react';
import styles from './cart.module.css';

function Cart() {
    const [items, setItems] = useState(getItems() || []);

    // function to add an item to the cart
    function addItem(item) {
        setItems([...items, item]);
        localStorage.setItem('cartItems', JSON.stringify(items));
    }

    // function to remove an item from the cart
    function removeItem(index) {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
        localStorage.setItem('cartItems', JSON.stringify(newItems));
    }
    function getItems() {
        return JSON.parse(localStorage.getItem('cartItems'));
    }

    // function to calculate the total price of all items in the cart
    function calculateTotal() {
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            total += items[i].price;
        }
        return total.toFixed(2);
    }

    return (
        <div className={styles.mainDiv}>
            <h2>Shopping Cart</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price.toFixed(2)}
                        <button onClick={() => removeItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <p>Total: ${calculateTotal()}</p>
        </div>
    );
}

export default Cart;
