
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
            const item = items[i];
            total += isNaN(item.price) ? item.price[item.selectedCount] : item.price;
        }
        return total.toFixed(2);
    }

    return (
        <div className={styles.mainDiv}>
            <h2>Shopping Cart</h2>
            <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <div>Item Name</div>
                <div>Item Options</div>
                <div>Item Prices</div>
            </div>
                {items.map((item, index) => (
                    console.log(item),
                    <div className={styles.item} key={index}>
                        <h2>{item.name}</h2>
                        <div>
                            {item.itemOptions.map((option, index) => (
                                <div key={index}>{option}</div>
                            ))}
                        </div>
                        <p>${isNaN(item.price) ? item.price[item.selectedCount].toFixed(2) : item.price}</p>
                        <p>Count: {item.selectedCount}</p>
                        <button onClick={() => removeItem(index)}>Remove</button>
                    </div>
                    
                ))}
            <p>Total: ${calculateTotal()}</p>
        </div>
    );
}

export default Cart;
