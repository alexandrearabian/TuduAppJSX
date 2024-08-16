import React from 'react';

const ProgressBar = ({ completed, total }) => {
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="progress-bar">
            <div className="progress" style={{ width: `${percentage}%` }}>
            </div>
        </div >
    );
};

export default ProgressBar;
