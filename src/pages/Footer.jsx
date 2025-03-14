import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="flipkart-footer">
      {/* Top Footer Section */}
      <div className="footer-top">
        {/* Column 1: ABOUT */}
        <div className="footer-column">
          <h3>ABOUT</h3>
          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Premium Stories</li>
            <li>Press</li>
            <li>Corporate Information</li>
          </ul>
        </div>

        

        {/* Column 3: HELP */}
        <div className="footer-column">
          <h3>HELP</h3>
          <ul>
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Column 4: CONSUMER POLICY */}
        <div className="footer-column">
          <h3>CONSUMER POLICY</h3>
          <ul>
            <li>Cancellation & Returns</li>
            <li>Terms Of Use</li>
            <li>Security</li>
            <li>Privacy</li>
          </ul>
        </div>

        {/* Column 5: MAIL US */}
        <div className="footer-column">
          <h3>Mail Us:</h3>
          <address>
            Premium private limited,<br />
            Buildings kalpavresha residancy,<br />
            Thavarakkar main road,<br />
            Bengaluru, 560029,<br />
            Karnataka, India
          </address>
          <div className="social-icons">
            <span>Social:</span>
            {/* Replace # with your social links */}
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="X">X</a>
            <a href="#" aria-label="YouTube">YT</a>
            <a href="#" aria-label="Instagram">IG</a>
          </div>
        </div>

        {/* Column 6: REGISTERED OFFICE ADDRESS */}
        <div className="footer-column">
          <h3>Registered Office Address:</h3>
          <address>
            Premium private limited,<br />
            Buildings kalpavresha residancy,<br />
            Thavarakkar main road,<br />
            Bengaluru, 560026,<br />
            Karnataka, India<br />
            Telephone: 9074420988/ 8590685088
          </address>
        </div>
      </div>
     </footer>
      
        
  );
};

export default Footer;

