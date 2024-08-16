import React from 'react';

const Slider = ({ habit, onChange, checkCompletion }) => {


    return (
        <>
            <input
                type="range"
                min="0"
                max={habit.dynamicAmount}
                value={habit.dynamicCompletedAmount}
                onChange={onChange}
                onMouseUp={checkCompletion}
                className='inputSlider'
                style={{
                    padding: '0'
                }}
            />
            <p>{habit.dynamicCompletedAmount}/{habit.dynamicAmount} {habit.dynamicUnit}</p>
        </>
    );

}

export default Slider;
