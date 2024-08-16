import React from 'react';

const PurchaseItems = ({ onPurchase }) => {
    const items = [
        { id: 1, name: 'New Color', price: 100 },
        { id: 2, name: 'New Interface Mode', price: 200 },
        { id: 3, name: 'Badge', price: 50 }
    ];

    return (
        <div className="purchase-items">
            <h2>Purchase Items</h2>
            <ol style={{ display: 'flex', flexDirection: 'column', }}>
                {items.map(item => (
                    <>
                        <li style={{ marginBottom: '10px'}} key={item.id} >
                            <span>{item.name}</span>

                        </li>
                        <button key={`${item.id}-button`} style={{ width: '90%' }} onClick={() => onPurchase(item)}>🟡 {item.price}</button>
                    </>
                ))}
            </ol>
        </div>
    );
};

export default PurchaseItems;
