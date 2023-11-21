import React, { useState } from 'react';
import styles from "./options.module.css";

const Options = ({ optionsArray, maxChecked, name, itemName}) => {
    const [options, setOptions] = useState(optionsArray || []);
    const [checkedCount, setCheckedCount] = useState(0);
    const [checkedLabels, setCheckedLabels] = useState([]);

    const handleCheckboxChange = (index, label, value) => {
        console.log(itemName)
        if(checkedCount < maxChecked || !value) {
            if(value) {
                const oldItems = JSON.parse(localStorage.getItem({itemName})) || [];
                const newOne = [...oldItems, label];
                localStorage.setItem({itemName}, JSON.stringify(newOne));
            }else{
                const oldOptions = JSON.parse(localStorage.getItem({itemName})) || [];

                oldOptions.splice(oldOptions.indexOf(label), 1);
                localStorage.removeItem({itemName});
                localStorage.setItem({itemName}, JSON.stringify(oldOptions));
            }
            const newCheckedCount = value ? checkedCount + 1 : checkedCount - 1;
            setCheckedCount(newCheckedCount);

            const newCheckedLabels = value ? [...checkedLabels, label] : checkedLabels.filter((checkedLabel) => checkedLabel !== label);
            setCheckedLabels(newCheckedLabels);
        }else{
            document.getElementById(`option-${index}-${label}`).checked = false;
        }
    };

    const isDisabled = maxChecked && checkedCount >= maxChecked;

    return (
        <div className={styles.optionCol}>
            <h3>{name}</h3>
            {options.map((option, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={`option-${index}-${option}`}
                        onChange={() => handleCheckboxChange(index, option, document.getElementById(`option-${index}-${option}`).checked)}
                        disabled={isDisabled && !options[index]}
                    />
                    <label htmlFor={`option-${index}-${option}`}>{option}</label>
                </div>
            ))}
        </div>
    );
};

export default Options;