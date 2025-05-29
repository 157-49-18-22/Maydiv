import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-description">We would love to hear from you! Fill out the form below and we will get in touch with you shortly.</p>
      <form className="contact-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>
        <button type="submit" className="contact-submit">Send Message</button>
      </form>
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p>Email: info@maydiv.com</p>
        <p>Phone: +91 12345 67890</p>
        <p>Address: 123 Digital Lane, Tech City, India</p>
      </div>
    </div>
  );
};

export default Contact;
