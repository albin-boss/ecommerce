// src/Home.jsx
import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaCommentDots, FaTimes } from "react-icons/fa";
import footer from "./Footer";
import "./home.css";
import { useNavigate,Link } from "react-router-dom";
import Footer from "./Footer";


const categories = [
  "Mobiles",
  "Fashion",
  "Electronics",
  "Home & Furniture",
  "Appliances",
  "Beauty & More",
];

const items = [
  { name: "Running Shoes", price: "₹2,000", image: "https://wallpaperaccess.com/full/5093060.jpg" ,
    link:"/card",
  },
  { name: "Smartphone", price: "₹12,999", image: "https://www.apple.com/v/iphone-16-pro/a/images/meta/iphone-16-pro_specs__dnmdxvp6g7wy_og.png" },
  { name: "Headphones", price: "₹1,499", image: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697016306/Croma%20Assets/Entertainment/Wireless%20Earbuds/Images/300119_9_vl8ja8.png?tr=w-1000" },
  { name: "Watch", price: "₹999", image: "https://bgr.com/wp-content/uploads/2023/09/Apple-Watch-Series-9.jpg?quality=82&strip=all" },
  { name: "Backpack", price: "₹799", image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/9739a943-167d-4975-937c-70f6a6837add.__CR0,0,970,600_PT0_SX970_V1___.jpg" },
];

function OffersGrid() {
  
  const offersData = [
    {
      title: "Fitness accessories",
      discount: "Min. 40% Off",
      brand: "Boldfit, Prowl & more",
      image: "https://wallpaperaccess.com/full/2465431.jpg",
    },
    {
      title: "Furnitures",
      discount: "Up to 70% Off",
      brand: "chairs, cabinets & more",
      image: "https://www.housedigest.com/img/gallery/20-ways-to-implement-dark-paint-colors-in-your-home/intro-1659519981.jpg",
    },
    {
      title: "Fashion",
      discount: "Min. 30% Off",
      brand: "HK Vitals, OZiva & more",
      image: "https://dagmaramach.com/wp-content/uploads/2023/08/green-dark-academia-dressy-outfit-ideas-spring-summer.jpeg",
    },
    {
      title: "Beauty",
      discount: "Up to 15% Off",
      brand: "Face serums, Foundation & more",
      image: "https://png.pngtree.com/background/20230528/original/pngtree-makeup-accessories-arranged-on-a-black-background-picture-image_2781512.jpg",
    },
    {
      title: "Dry fruits",
      discount: "Up to 65% Off",
      brand: "Dates, Almond, Hazelnuts…",
      image: "https://img.freepik.com/premium-photo/dry-fruits-image-dark-wooden-surface_1036998-330106.jpg",
    },
    {
      title: "Appliances",
      discount: "Max. 20% Off",
      brand: "Refrigerator & more",
      image: "https://www.brayandscarff.com/_plugins/site-pages/wordpress/wp-content/uploads/2017/07/BlackSS1.jpg",
     
    },
    {
      title: "Ornaments",
      discount: "Up to 15% Off",
      brand: "Pendants & Lockets",
      image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shopsy-pendant-locket/x/w/x/na-na-ethnic-trendy-black-silver-mens-geometric-rectangle-original-imah3ge8574j2n8g.jpeg?q=90&crop=false",
    },
    
    {
      title: "Kids' Dresses",
      discount: "60-80% Off",
      brand: "Miss & Chief, Allen Solly & more",
      image: "https://content.jdmagicbox.com/quickquotes/images_main/-2elorn68.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit",
    },
  ];

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  };

  const cardStyle = {
    background: "#444",
    border: "1px solid #555",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
  };

  const imgStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "4px",
    objectFit: "cover",
    marginBottom: "12px",
  };

  const titleStyle = {
    margin: "8px 0 4px",
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#fff",
  };

  const discountStyle = {
    margin: 0,
    color: "#ff5722",
    fontWeight: "bold",
    fontSize: "1.1rem",
  };

  const brandStyle = {
    display: "block",
    marginTop: "6px",
    color: "#ccc",
    fontSize: "1rem",
  };

  return (
    <div style={gridStyle}>
      {offersData.map((offer, index) => (
        <div style={cardStyle} key={index}>
          <img style={imgStyle} src={offer.image} alt={offer.title} />
          <h3 style={titleStyle}>{offer.title}</h3>
          <p style={discountStyle}>{offer.discount}</p>
          <span style={brandStyle}>{offer.brand}</span>
        </div>
      ))}
    </div>
  );
}

const Afterlogin = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="container">
      {/* Header */}
      <header>
        <h1>PREMIUM</h1>
        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search for Products, Brands and More" />
        </div>
        <div className="actions">
          <button className="button" onClick={() => navigate("/login")}>
            <FaUser /> Logout
          </button>
          <button className="button" onClick={() => navigate("/cart")}>
            <FaShoppingCart /> Cart
          </button>
        </div>
      </header>

      {/* Categories */}
      <nav>
        {categories.map((category, index) => (
          <button key={index}>{category}</button>
        ))}
      </nav>

      {/* Banner */}
      
  <div class="gallery-wrap">
    <div class="item item-1">
      
    </div>
    <div class="item item-2"></div>
    <div class="item item-3"></div>
    <div class="item item-4"></div>
    <div class="item item-5"></div>
  </div>

      {/* Top Offers */}
      <section className="offers">
        <h3 >Top Offers!</h3>
        <div className="grid-container">
          {items.map((item, index) => (
            <div key={index} className="item-card">
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <Link to={item.link}>read more</Link>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Today's Offers */}
      <section className="offers-grid-section">
        <h3 >Today's Offers</h3>
        <OffersGrid />
      </section>

      {/* Chat Popup */}
      <button className="chat-icon" onClick={() => setIsChatOpen(true)}>
        <FaCommentDots />
      </button>
      {isChatOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <h4>Chat Support</h4>
            <button onClick={() => setIsChatOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <p>Hello! How can we assist you today?</p>
        </div>
      )}

<Footer />
    </div>
  );
};

export default Afterlogin;
