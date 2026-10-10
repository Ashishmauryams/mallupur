
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Send,
  MessageCircle,
  Headphones,
} from "lucide-react";
import "./Contact.scss";

const contactDetails = [
  {
    icon: MapPin,
    title: "Village Address",
    value: "Mallupur, Uttar Pradesh, India",
    description: "Visit our village office",
  },
  {
    icon: Phone,
    title: "Phone Number",
    value: "+91 XXXXX XXXXX",
    description: "Contact us for assistance",
  },
  {
    icon: Mail,
    title: "Email Address",
    value: "contact@mallupur.in",
    description: "Send us your queries",
  },
  {
    icon: Clock,
    title: "Office Hours",
    value: "Monday – Saturday",
    description: "10:00 AM – 5:00 PM",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
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

    // Abhi frontend demo hai.
    // Yahan baad mein apni contact API call karna.
    console.log("Contact Form Data:", formData);

    alert("Your message has been submitted successfully!");

    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">

      <div className="container">
        <section className="contact-hero">
          <div className="contact-hero__pattern" />

          <div className="contact-hero__content">
            <span className="contact-hero__badge">
              <MessageCircle size={15} />
              WE ARE HERE TO HELP
            </span>

            <h1>
              Let's Connect With <span>Our Village</span>
            </h1>

            <p>
              Have a question, suggestion, or a concern about our village?
              Reach out to us. Together, we can make Mallupur a better place
              for everyone.
            </p>

            <a href="#contact-form" className="contact-hero__button">
              Get In Touch
              <ArrowUpRight size={18} />
            </a>

            <div className="contact-hero__trust">
              <span className="contact-hero__trust-icon">
                <Headphones size={20} />
              </span>
              <div>
                <strong>Your voice matters</strong>
                <p>We value every suggestion and concern.</p>
              </div>
            </div>
          </div>

          <div className="contact-hero__visual">
            <div className="contact-hero__image">
              <img
                src="/images/village-about.png"
                alt="Mallupur village"
              />

              <div className="contact-hero__image-overlay" />

              <div className="contact-hero__image-card">
                <span className="contact-hero__pin">
                  <MapPin size={21} />
                </span>
                <div>
                  <strong>Mallupur Village</strong>
                  <p>Connected for a better tomorrow</p>
                </div>
              </div>
            </div>

            <div className="contact-hero__floating-icon">
              <MessageCircle size={25} />
            </div>
          </div>
        </section>

        <section className="contact-info section-container">
          <div className="contact-section-heading">
            <span className="contact-eyebrow">CONTACT INFORMATION</span>
            <h2>We're Just a Message Away</h2>
            <p>
              Choose the easiest way to get in touch with the village
              administration.
            </p>
          </div>

          <div className="contact-info__grid">
            {contactDetails.map((item) => {
              const Icon = item.icon;

              return (
                <article className="contact-info__card" key={item.title}>
                  <div className="contact-info__icon">
                    <Icon size={23} />
                  </div>

                  <h3>{item.title}</h3>
                  <p className="contact-info__value">{item.value}</p>
                  <span>{item.description}</span>
                </article>
              );
            })}
          </div>
        </section>

        <section className="contact-main section-container">
          <div className="contact-main__intro">
            <span className="contact-eyebrow">LET'S TALK</span>
            <h2>How Can We Help You?</h2>
            <p>
              Fill out the form and share your query, feedback, or
              suggestion with us.
            </p>

            <div className="contact-main__note">
              <div className="contact-main__note-icon">
                <MessageCircle size={22} />
              </div>
              <div>
                <strong>Every message counts</strong>
                <p>
                  Your feedback helps us understand the needs of our
                  village community.
                </p>
              </div>
            </div>

            <div className="contact-main__location">
              <div className="contact-main__location-icon">
                <MapPin size={21} />
              </div>
              <div>
                <strong>Find Our Village</strong>
                <p>Mallupur, Uttar Pradesh, India</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Mallupur+Uttar+Pradesh"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Google Maps <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-card" id="contact-form">
            <div className="contact-form-card__heading">
              <span className="contact-form-card__icon">
                <Send size={20} />
              </span>
              <div>
                <h3>Send Us a Message</h3>
                <p>We'd love to hear from you.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form__field">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="subject">Subject *</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="What is your query about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="contact-form__submit">
                Send Message
                <Send size={17} />
              </button>

              <p className="contact-form__privacy">
                Your information should be handled responsibly and securely.
              </p>
            </form>
          </div>
        </section>

        <section className="contact-cta section-container">
          <div className="contact-cta__icon">
            <MessageCircle size={27} />
          </div>

          <div className="contact-cta__text">
            <h2>Let's Build a Better Mallupur Together</h2>
            <p>
              Your ideas, participation, and feedback can make a real
              difference in our village.
            </p>
          </div>

          <a href="#contact-form" className="contact-cta__button">
            Contact Us <ArrowUpRight size={17} />
          </a>
        </section>
      </div>

    </main>
  );
};

export default Contact;
