
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
            total += priceCalc(item);
        }
        return total;
    }
    function priceCalc(item) {
        let perItemPrice = item.price[item.selectedSubtype || 0];
        let total = perItemPrice * item.amount;
        return total;
    }

    return (
        <div className={styles.mainDiv}>
            <h2>Shopping Cart</h2>
            <div className={styles.gridDiv}>
                <div>Item Name</div>
                <div>Item Options</div>
                <div>Item Prices</div>
                <div>Item Count</div>
                <div>Remove Item</div>
                {items.map((item, index) => (
                    console.log(item),
                    <>
                        <h2>{item.selectedSubtype ? `${item.selectedSubtype} ${item.name}` : item.name}</h2>
                        <div>
                            {item.itemOptions.map((option, index) => (
                                <div key={index}>{option}</div>
                            ))}
                        </div>
                        <p>${priceCalc(item).toFixed(2)}</p>
                        <div>
                            <button
                                onClick={() => {
                                    const newItems = [...items];
                                    if(newItems[index].amount > 1) {
                                    newItems[index].amount = newItems[index].amount - 1;
                                    setItems(newItems);
                                    localStorage.setItem('cartItems', JSON.stringify(newItems));
                                }}}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                className={styles.numInput}
                                value={item.amount || 1}
                                readOnly
                            />
                            <button
                                onClick={() => {
                                    const newItems = [...items];
                                    if(newItems[index].amount >= 0){
                                    newItems[index].amount = newItems[index].amount + 1;
                                    setItems(newItems);
                                    localStorage.setItem('cartItems', JSON.stringify(newItems));
                                }}}
                            >
                                +
                            </button>
                        </div>
                        <button onClick={() => removeItem(index)}>Remove</button>
                        </>
                ))}
                </div>
            <p>Total: ${calculateTotal().toFixed(2)}</p>
        </div>
    );
}

export default Cart;
