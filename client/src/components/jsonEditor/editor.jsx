import React, { useState } from 'react';
import menuJson from '../../assets/json/menu.json';
import styles from './editor.module.css';

const JsonEditor = () => {
    const [data, setData] = useState(menuJson);

    const handleInputChange = (event, key) => {
        const { value } = event.target;
        setData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const renderJson = (jsonData, parentKey = '', depth = 0) => {
        return Object.keys(jsonData).map(key => {
            const value = jsonData[key];
            const fullKey = parentKey ? `${parentKey}.${key}` : key;
            const backgroundColor = `rgba(0, 0, 255, ${depth / 10})`; // Change the background color based on depth

            if (typeof value === 'object') {
                return (
                    <div key={fullKey} style={{ backgroundColor }}>
                        <h4>{key}</h4>
                        <div className={styles.nested}>
                            {renderJson(value, fullKey, depth + 1)}
                        </div>
                    </div>
                );
            }

            return (
                <div key={fullKey} style={{ backgroundColor }}>
                    <label htmlFor={fullKey}>{key}</label>
                    <input
                        type="text"
                        id={fullKey}
                        value={value}
                        onChange={event => handleInputChange(event, fullKey)}
                    />
                </div>
            );
        });
    };

    return (
        <div className={styles.container}>
            {renderJson(data)}
        </div>
    );
};

export default JsonEditor;