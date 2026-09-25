
import { House } from "lucide-react";
import "./footer.scss";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import { FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="village-footer">
      <div className="footer-container">

        {/* About */}
        <div className="footer-column footer-about">
          <div className="footer-logo">
            <span className="logo-icon"><House /></span>
            <span>Mallupur</span>
          </div>

          <p>
            Welcome to Mallupur Village. Our digital platform helps
            villagers stay connected with local information, services,
            events and important updates.
          </p>

          <div className="footer-social">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>

            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Village</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/news">News & Updates</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-column">
          <h3>Village Services</h3>

          <ul>
            <li><a href="/members">Village Members</a></li>
            <li><a href="/committee">Village Committee</a></li>
            <li><a href="/notices">Notices</a></li>
            <li><a href="/complaints">Complaints</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-column footer-contact">
          <h3>Contact Us</h3>

          <div className="contact-item">
            <FaLocationDot />
            <span>
              Mallupur Village,<br />
              Jaunpur, Uttar Pradesh
            </span>
          </div>

          <div className="contact-item">
            <FaPhone />
            <span>+91 98765 43210</span>
          </div>

          <div className="contact-item">
            <FaEnvelope />
            <span>info@mallupur.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>
            © {new Date().getFullYear()} Mallupur Village. All Rights Reserved.
          </p>

          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

