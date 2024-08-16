import React from 'react';

const ProfileCustomization = ({ customization }) => {
    return (
        <div className="profile-customization">
            <h2>Profile Customization</h2>
            <p>Color: {customization.color}</p>
            <p>Mode: {customization.mode}</p>
            {/* <p>Badges: {customization.badges.join(', ')}</p> */}
        </div>
    );
};

export default ProfileCustomization;
