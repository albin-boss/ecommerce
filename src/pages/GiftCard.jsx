import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Gift.css';

function GiftCard() {
  const [giftCards, setGiftCards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8005/api/giftcards')
      .then(response => {
        setGiftCards(response.data);
      })
      .catch(error => {
        console.error('Error fetching gift cards:', error);
      });
  }, []);

  return (
    <div className="giftcard-container">
      <h2 className="giftcard-title">🎁 Gift Cards</h2>
      <div className="giftcard-grid">
        {giftCards.map(card => (
          <div className="giftcard-card" key={card.id}>
            <img src={card.imageUrl} alt={card.name} className="giftcard-image" />
            <h3>{card.name}</h3>
            <p>{card.description}</p>
            <p className="giftcard-price">₹{card.price}</p>
            <button className="giftcard-buy-btn">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GiftCard;
