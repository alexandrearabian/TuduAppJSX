import React from 'react';

const PurchaseHistory = ({ purchaseHistory, handleClearHistory }) => {
    return (
        <div className="purchase-history">
            <h2>Purchase History</h2>
            <ul>
                {purchaseHistory.map((item, index) => (
                    <li key={index}>{item.name} - {item.price} coins</li>
                ))}
                <button onClick={handleClearHistory}>Clear History</button>
            </ul>
        </div>
    );
};

export default PurchaseHistory;
