"use client";
import React from "react";
import Lottie from "lottie-react";
import whatsappAnimation from "../../public/Whatsapp.json";

const WhatsappLottie = () => (
  <a
    href="https://wa.me/9220438999" // Apna WhatsApp number yahan daalein
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: "fixed",
      bottom: "30px",
      right: "10px",
      zIndex: 9999,
      width: "100px",
      height: "70px",
      cursor: "pointer",
    }}
  >
    <Lottie animationData={whatsappAnimation} loop={true} />
  </a>
);

export default WhatsappLottie; 