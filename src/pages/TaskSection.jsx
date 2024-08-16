import React from 'react';
import crown from '../assets/crown.png'

const TaskSection = () => {
    return (
        <div className="goal-path">
            <div className="goal">
                <h3 className='goal-text'>Goal</h3>
                <img src={crown} alt="Goal" className="goal-icon" />
            </div>
            <div className="path">
                <div className="step s1">S1</div>
                <div className="step s2">S2</div>
                <div className="step s3">S3</div>
            </div>
        </div>
    );
};

export default TaskSection;
