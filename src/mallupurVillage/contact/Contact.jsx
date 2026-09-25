
import React, { useState } from "react";
import "./Contact.scss";
import { Clock, LocateFixed, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form Data:", formData);

    // API call yahan kar sakte ho
    // axios.post("/contact", formData)

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">

      {/* ================= HERO ================= */}
      <section className="contact-hero">
        <div className="contact-hero-overlay">
          <div className="contact-container">
            <span className="hero-badge">हमसे जुड़ें</span>

            <h1>संपर्क करें</h1>

            <p>
              गाँव से जुड़ी किसी भी जानकारी, समस्या या सुझाव के लिए
              हमसे संपर्क करें।
            </p>

            <div className="breadcrumb">
              <span>Home</span>
              <span>/</span>
              <strong>Contact</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT INFO ================= */}
      <section className="contact-info-section">
        <div className="contact-container">

          <div className="section-heading">
            <span>GET IN TOUCH</span>
            <h2>हम आपकी सहायता के लिए यहाँ हैं</h2>
            <p>
              Mallupur Village से संबंधित किसी भी जानकारी के लिए
              नीचे दिए गए माध्यमों से हमसे संपर्क कर सकते हैं।
            </p>
          </div>

          <div className="contact-info-grid">

            {/* Phone */}
            <div className="info-card">
              <div className="info-icon">
                <span><Phone /></span>
              </div>

              <div>
                <h3>फोन करें</h3>
                <p>हमसे सीधे बात करने के लिए</p>

                <a href="tel:+919876543210">
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="info-card">
              <div className="info-icon">
                <span><Mail /></span>
              </div>

              <div>
                <h3>ईमेल करें</h3>
                <p>अपनी जानकारी हमें ईमेल करें</p>

                <a href="mailto:info@mallupurvillage.in">
                  info@mallupurvillage.in
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="info-card">
              <div className="info-icon">
                <span><LocateFixed /></span>
              </div>

              <div>
                <h3>पता</h3>
                <p>ग्राम पंचायत कार्यालय</p>

                <strong>
                  Mallupur, Uttar Pradesh, India
                </strong>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= MAIN CONTACT ================= */}
      <section className="contact-main-section">
        <div className="contact-container">

          <div className="contact-main-grid">

            {/* LEFT SIDE */}
            <div className="contact-left">

              <span className="small-title">
                VILLAGE OFFICE
              </span>

              <h2>
                ग्राम कार्यालय से संपर्क करें
              </h2>

              <p className="description">
                यदि आपके पास गाँव के विकास, सरकारी सेवाओं,
                शिकायत, प्रमाण पत्र या किसी अन्य विषय से
                संबंधित कोई प्रश्न है, तो हमें संदेश भेजें।
              </p>

              <div className="office-details">

                <div className="office-detail">
                  <div className="detail-icon"><LocateFixed /></div>

                  <div>
                    <h4>कार्यालय का पता</h4>
                    <p>
                      ग्राम पंचायत कार्यालय,<br />
                      Mallupur, Uttar Pradesh, India
                    </p>
                  </div>
                </div>

                <div className="office-detail">
                  <div className="detail-icon"><Clock /></div>

                  <div>
                    <h4>कार्यालय समय</h4>
                    <p>
                      सोमवार - शुक्रवार<br />
                      सुबह 10:00 बजे - शाम 5:00 बजे
                    </p>
                  </div>
                </div>

                <div className="office-detail">
                  <div className="detail-icon"><Phone /></div>

                  <div>
                    <h4>संपर्क नंबर</h4>
                    <p>
                      +91 98765 43210
                    </p>
                  </div>
                </div>

              </div>

              {/* OFFICE REPRESENTATIVE */}
              <div className="representative-card">

                <div className="representative-avatar">
                  GP
                </div>

                <div>
                  <span>संपर्क अधिकारी</span>
                  <h3>ग्राम पंचायत कार्यालय</h3>
                  <p>
                    Mallupur Village
                  </p>
                </div>

              </div>

            </div>

            {/* RIGHT FORM */}
            <div className="contact-form-card">

              <div className="form-heading">
                <span>MESSAGE US</span>
                <h2>अपना संदेश भेजें</h2>
                <p>
                  नीचे दिए गए फॉर्म को भरकर हमसे संपर्क करें।
                </p>
              </div>

              <form onSubmit={handleSubmit}>

                <div className="form-row">

                  <div className="form-group">
                    <label htmlFor="name">
                      आपका नाम <span>*</span>
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="अपना नाम दर्ज करें"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      मोबाइल नंबर <span>*</span>
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div className="form-row">

                  <div className="form-group">
                    <label htmlFor="email">
                      ईमेल
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">
                      विषय <span>*</span>
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        विषय चुनें
                      </option>

                      <option value="general">
                        सामान्य जानकारी
                      </option>

                      <option value="complaint">
                        शिकायत
                      </option>

                      <option value="suggestion">
                        सुझाव
                      </option>

                      <option value="service">
                        सरकारी सेवा
                      </option>
                    </select>
                  </div>

                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    संदेश <span>*</span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="अपना संदेश यहाँ लिखें..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">
                  <span>संदेश भेजें</span>
                  <span className="arrow">→</span>
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="map-section">

        <div className="map-header">
          <span>OUR LOCATION</span>
          <h2>हमारा स्थान</h2>
          <p>
            Mallupur Village तक पहुँचने के लिए हमारा स्थान देखें।
          </p>
        </div>

        <div className="map-wrapper">

          {/* Google Map iframe yahan baad me add kar sakte ho */}
          <div className="map-placeholder">

            <div className="map-content">

              <div className="map-pin">
                <MapPin />
              </div>

              <h3>Mallupur Village</h3>

              <p>
                Uttar Pradesh, India
              </p>

              <button
                type="button"
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps",
                    "_blank"
                  )
                }
              >
                Google Maps पर देखें
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Contact;
