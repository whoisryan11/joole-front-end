import React from 'react';
import { Slider } from '@material-ui/core';

import styles from './Filter.module.css';
function valuetext(value) {
    return `${value}`;
}
const Filter = (props) => {
    const [yearValue, setYearValue] = React.useState([1990, 2020]);
    const [airflowValue, setAirflowValue] = React.useState([2000, 10000]);
    const handleAirflowChange = (event, newValue) => {
        setAirflowValue(newValue);
    };
    const [maxPowerValue, setMaxPowerValue] = React.useState([0, 100]);
    const handleMaxPowerChange = (event, newValue) => {
        setMaxPowerValue(newValue);
    };
    const [soundValue, setSoundValue] = React.useState([0, 100]);
    const handleSoundChange = (event, newValue) => {
        setSoundValue(newValue);
    };
    const [diameterValue, setDiameterValue] = React.useState([0, 100]);
    const handleDiameterChange = (event, newValue) => {
        setDiameterValue(newValue);
    };
    
    return (
    <div className={styles.Filter}>
        <div className={styles.Para}>
            <p>Search: </p>
            <button onClick={() => 
                props.updateFilter(yearValue, airflowValue, maxPowerValue, soundValue, diameterValue)}>save</button>
        </div>
        <div className={styles.Title}>Product type</div>
        <div className={styles.para}>
            {'Model Year:'}
            <input size='1' value={yearValue[0]} onChange={(event) => setYearValue([+event.target.value, yearValue[1]])} />
            {'-'}
            <input size='1' value={yearValue[1]} onChange={(event) => setYearValue([yearValue[0], +event.target.value])} />
        </div>
        <div>
            <div>Airflow (CFM)</div>
            <div className={styles.Para}>
                <input size='1' value={airflowValue[0]} onChange={(event) => setAirflowValue([+event.target.value, airflowValue[1]])} />
                <Slider 
                    value = {airflowValue}
                    min={2000}
                    max={10000}
                    onChange={handleAirflowChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
                <input size='1' value={airflowValue[1]} onChange={(event) => setAirflowValue([airflowValue[0], +event.target.value])} />
            </div>
            <div>Max Power (W)</div>
            <div className={styles.Para}>
                <input size='1' value={maxPowerValue[0]} onChange={(event) => setMaxPowerValue([+event.target.value, maxPowerValue[1]])} />
                <Slider 
                    value = {maxPowerValue}
                    min={0}
                    max={100}
                    onChange={handleMaxPowerChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
                <input size='1' value={maxPowerValue[1]} onChange={(event) => setMaxPowerValue([maxPowerValue[0], +event.target.value])} />
            </div>
            <div>Sound at max speed (dbA)</div>
            <div className={styles.Para}>
                <input size='1' value={soundValue[0]} onChange={(event) => setSoundValue([+event.target.value, soundValue[1]])} />
                <Slider 
                    value = {soundValue}
                    min={0}
                    max={100}
                    onChange={handleSoundChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
                <input size='1' value={soundValue[1]} onChange={(event) => setSoundValue([soundValue[0], +event.target.value])} />
            </div>
            <div>Fan Sweep diameter (in)</div>
            <div className={styles.Para}>
                <input size='1' value={diameterValue[0]} onChange={(event) => setDiameterValue([+event.target.value, diameterValue[1]])} />
                <Slider 
                    value = {diameterValue}
                    min={0}
                    max={100}
                    onChange={handleDiameterChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
                <input size='1' value={diameterValue[1]} onChange={(event) => setDiameterValue([diameterValue[0], +event.target.value])} />
            </div>
        </div>

        
        
    </div>)
}

export default Filter;