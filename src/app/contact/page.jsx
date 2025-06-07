"use client";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";
import Footer from '../../components/Footer';
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [showPhone, setShowPhone] = useState(false);
  const handleFieldFocus = () => {
    if (!showPhone) setShowPhone(true);
  };

  return (
    <>
      <header className="header-container">
        <nav className="header-nav">
          <div className="header-logo">
            <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} />
          </div>
          <ul className="header-links">
            <li><Link href="#home">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/testimonials">Testimonials</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <div className="header-socials">
            <a href="#" aria-label="GitHub"><FaGithub /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
          </div>
        </nav>
      </header>

      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#7b4bc9"
      }}>
        <div style={{
          background: "#fff",
          borderRadius: 28,
          boxShadow: "0 8px 40px #7b4bc933",
          display: "flex",
          maxWidth: 900,
          width: "100%",
          minHeight: 420,
          overflow: "hidden"
        }}>
          {/* Left: Image */}
          <div style={{
            background: "#a77ff7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 440,
            minWidth: 320,
            padding: 0,
            overflow: "hidden"
          }}>
            <Image
              src="/Phone.png"
              alt="Phone"
              width={440}
              height={410}
              style={{
                borderRadius: 24,
                marginTop: 100,
                transition: "transform 1.6s ease, opacity 1.6s ease",
                transform: showPhone ? "translateX(0)" : "translateX(120%)",
                opacity: showPhone ? 1 : 0
              }}
            />
          </div>

          {/* Right: Form */}
          <div style={{
            flex: 0.9,
            minWidth: 260,
            maxWidth: 370,
            padding: "48px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 8, color: "#222" }}>GET IN TOUCH WITH US</h2>
            <p style={{ color: "#888", fontSize: 15, marginBottom: 24 }}>Leave us a message, we will contact you as soon as possible.</p>
            <form style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <label style={{ fontWeight: 500, fontSize: 14, color: "#444", marginBottom: 4 }}>FULL NAME</label>
              <input type="text" placeholder="Your Name" style={{ padding: "12px 14px", borderRadius: 8, border: "1.5px solid #d1c4e9", marginBottom: 12, fontSize: 15 }} onFocus={handleFieldFocus} />
              <label style={{ fontWeight: 500, fontSize: 14, color: "#444", marginBottom: 4 }}>EMAIL</label>
              <input type="email" placeholder="Your Email" style={{ padding: "12px 14px", borderRadius: 8, border: "1.5px solid #d1c4e9", marginBottom: 12, fontSize: 15 }} onFocus={handleFieldFocus} />
              <label style={{ fontWeight: 500, fontSize: 14, color: "#444", marginBottom: 4 }}>MESSAGE</label>
              <textarea placeholder="Type your message..." rows={4} style={{ padding: "12px 14px", borderRadius: 8, border: "1.5px solid #d1c4e9", marginBottom: 18, fontSize: 15, resize: "vertical" }} onFocus={handleFieldFocus} />
              <button type="submit" className="send-btn-animated"><span>SEND</span></button>
            </form>
          </div>
        </div>
      </div>

      {/* New Section: Office Address, Contact Details, and Social Media */}
      <div style={{ width: "100%", background: "#7b4bc9"}}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", padding: 24 }}>
          {/* Office Address */}
          <div style={{ flex: 1, minWidth: 250, background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 12, color: "#333" }}>Office Address</h3>
            <p style={{ color: "#666", fontSize: 15, lineHeight: 1.5 }}>123 Business Street, Suite 100<br />New York, NY 10001<br />United States</p>
          </div>
          {/* Contact Details */}
          <div style={{ flex: 1, minWidth: 250, background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 12, color: "#333" }}>Contact Details</h3>
            <p style={{ color: "#666", fontSize: 15, lineHeight: 1.5 }}>Email: info@example.com<br />Phone: +1 (555) 123-4567<br />Fax: +1 (555) 987-6543</p>
          </div>
          {/* Social Media */}
          <div style={{ flex: 1, minWidth: 250, background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 12, color: "#333" }}>Follow Us</h3>
            <div style={{ display: "flex", gap: 16 }}>
              <a href="#" aria-label="GitHub" style={{ color: "#333", fontSize: 24 }}><FaGithub /></a>
              <a href="#" aria-label="Instagram" style={{ color: "#333", fontSize: 24 }}><FaInstagram /></a>
              <a href="#" aria-label="Facebook" style={{ color: "#333", fontSize: 24 }}><FaFacebook /></a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header-container {
          background: #0a0a0a;
          color: #fff;
          min-height: unset;
          height: auto;
          padding-bottom: 0;
          position: relative;
          overflow: hidden;
          width: 100vw;
          max-width: 100vw;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          box-sizing: border-box;
          z-index: 1000;
        }

        .header-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px 0 32px;
          width: 100%;
          box-sizing: border-box;
          height: 80px;
        }

        .header-logo img {
          height: 100px;
        }

        .header-links {
          display: flex;
          gap: 32px;
          list-style: none;
        }

        .header-links a {
          color: #fff;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          transition: color 0.2s;
        }

        .header-links a:hover {
          color: #b983ff;
        }

        .header-socials a {
          color: #fff;
          margin-left: 16px;
          font-size: 1.3rem;
          transition: color 0.2s;
        }

        .header-socials a:hover {
          color: #b983ff;
        }

        .header-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 0px;
        }

        .header-hero h1 {
          font-size: 6.2rem;
          font-weight: 900;
          margin-bottom: 24px;
          line-height: 1.08;
          letter-spacing: -2px;
          text-align: center;
        }

        .send-btn-animated {
          background: #a77ff7;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px 0;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: 1px;
          cursor: pointer;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
          transition: background 0.2s;
        }
        .send-btn-animated::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -100%;
          width: 100%;
          height: 100%;
          background: #111;
          border-radius: 0 0 8px 8px;
          z-index: 1;
          transition: bottom 0.4s cubic-bezier(0.77,0,0.175,1);
        }
        .send-btn-animated:hover::before {
          bottom: 0;
          animation: waveRise 0.5s cubic-bezier(0.77,0,0.175,1);
        }
        .send-btn-animated span {
          position: relative;
          z-index: 2;
          transition: color 0.2s;
        }
        .send-btn-animated:hover span {
          color: #fff;
        }
        @keyframes waveRise {
          0% { bottom: -100%; }
          100% { bottom: 0; }
        }
      `}</style>
           <Footer />
    </>
  );
}
