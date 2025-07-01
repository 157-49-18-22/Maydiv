"use client";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import whatsappAnimation from "../../public/Whatsapp.json";

const WhatsappLottie = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const style = isMobile
    ? {
        position: "fixed",
        bottom: "16px",
        right: "6px",
        zIndex: 9999,
        width: "60px",
        height: "45px",
        cursor: "pointer",
      }
    : {
        position: "fixed",
        bottom: "30px",
        right: "10px",
        zIndex: 9999,
        width: "100px",
        height: "70px",
        cursor: "pointer",
      };

  return (
    <a
      href="https://wa.me/9220438999" // Apna WhatsApp number yahan daalein
      target="_blank"
      rel="noopener noreferrer"
      style={style}
    >
      <Lottie animationData={whatsappAnimation} loop={true} />
    </a>
  );
};

export default WhatsappLottie; 