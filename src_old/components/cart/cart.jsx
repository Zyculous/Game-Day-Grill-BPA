
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
            <h2 style={{fontSize:'40pt', marginTop:0}} >Shopping Cart</h2>
            <div className={styles.itemsDiv}>
                <div className={styles.itemTitles}>
                    <div className={styles.itemName}>Item Name</div>
                    <div className={styles.itemOptions}>Item Options</div>
                    <div className={styles.itemPrice}>Item Prices</div>
                    <div className={styles.itemCount}>Item Count</div>
                    <div className={styles.itemRemove}>Remove Item</div>
                </div>
                {items.map((item, index) => (
                    console.log(item),
                    <div className={styles.item}>
                        <h2 className={styles.itemName}>{item.selectedSubtype ? `${item.selectedSubtype} ${item.name}` : item.name}</h2>
                        <div className={styles.itemOptions}>
                            {item.itemOptions.map((option, index) => (
                                <div key={index}>{option}</div>
                            ))}
                        </div>
                        <p className={styles.itemPrice}>${priceCalc(item).toFixed(2)}</p>
                        <div className={styles.itemCount}>
                            <button
                                className={styles.btn}
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
                                className={styles.btn}
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
                        <button className={styles.itemRemove} onClick={() => removeItem(index)}>Remove</button>
                        </div>
                ))}
                </div>
            <p className={styles.total}>Total: ${calculateTotal().toFixed(2)}</p>
        </div>
    );
}

export default Cart;
