import React, { useState, useEffect } from 'react';
import PurchaseItems from '../components/shopComponents/PurchaseItems';
import PurchaseHistory from '../components/shopComponents/PurchaseHistory';
import ProfileCustomization from '../components/shopComponents/ProfileCustomization';
import { getData, setData } from '../functions/LocalStorageFunctions';

const Shop = () => {
    // Load initial state from localStorage using getData function
    const [balance, setBalance] = useState(getData('balance') || 10543);
    const [purchaseHistory, setPurchaseHistory] = useState(getData('purchaseHistory') || []);
    const [profileCustomization, setProfileCustomization] = useState(getData('profileCustomization') || {
        color: 'default',
        mode: 'dark',
        badges: []
    });

    // Save data to localStorage whenever state changes
    useEffect(() => {
        setData('balance', balance);
    }, [balance]);

    useEffect(() => {
        setData('purchaseHistory', purchaseHistory);
    }, [purchaseHistory]);

    useEffect(() => {
        setData('profileCustomization', profileCustomization);
    }, [profileCustomization]);

    const handlePurchase = (item) => {
        if (balance >= item.price) {
            setBalance(balance - item.price);
            setPurchaseHistory([...purchaseHistory, item]);

            // Add item to profile customization if applicable
            if (item.name === 'New Color') {
                setProfileCustomization({ ...profileCustomization, color: 'purple' });
            } else if (item.name === 'New Interface Mode') {
                setProfileCustomization({ ...profileCustomization, mode: 'newMode' });
            } else if (item.name === 'Badge') {
                setProfileCustomization({ ...profileCustomization, badges: [...profileCustomization.badges, 'newBadge'] });
            }

        } else {
            alert('Insufficient balance');
        }
    };

    const handleClearHistory = () => {
        setPurchaseHistory([]);
        localStorage.setItem('purchaseHistory', JSON.stringify([]));
    };


    return (
        <>
            <h1>Shop</h1>
            <div className="shop-container">
                <PurchaseItems onPurchase={handlePurchase} />
                <PurchaseHistory handleClearHistory={handleClearHistory} purchaseHistory={purchaseHistory} />
                <ProfileCustomization customization={profileCustomization} />
            </div>
        </>
    );
};

export default Shop;
