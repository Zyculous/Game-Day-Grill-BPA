import React, { useState } from 'react';

const Options = ({ optionsArray, maxChecked, name}) => {
    const [options, setOptions] = useState(optionsArray || []);
    const [checkedCount, setCheckedCount] = useState(0);
    const [checkedLabels, setCheckedLabels] = useState([]);

    const handleCheckboxChange = (index, label, value) => {
        if(checkedCount < maxChecked || !value) {
            const newOptions = [...options];
            newOptions[index] = label;
            setOptions(newOptions);

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
        <div>
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
           {/*<div>
                {checkedLabels.length > 0 && (
                    <div>
                        <h3>Checked Options:</h3>
                        <ul>
                            {checkedLabels.map((checkedLabel, index) => (
                                <li key={index}>{checkedLabel}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>*/}
        </div>
    );
};

export default Options;