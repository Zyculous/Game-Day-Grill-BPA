
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
        return total.toFixed(2);
    }
    function priceCalc(item) {
        return isNaN(item.price) ? item.price[item.selectedCount] * item.amount || item.price[item.selectedMult] * item.amount : item.price * item.amount ;
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
                        <h2>{item.selectedCount ? `${item.selectedCount}x ${item.name}` : item.selectedMult ? `${item.selectedMult} ${item.name}` : item.name}</h2>
                        <div>
                            {item.itemOptions.map((option, index) => (
                                <div key={index}>{option}</div>
                            ))}
                        </div>
                        <p>${priceCalc(item)}</p>
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
            <p>Total: ${calculateTotal()}</p>
        </div>
    );
}

export default Cart;
