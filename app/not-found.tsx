"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import Button from "@/components/ui/button";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iceCreamRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".not-found-icecream",
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.2 }
      )
        .fromTo(
          ".not-found-text",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".not-found-subtext",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".not-found-button",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5 },
          "-=0.3"
        );

      gsap.to(".not-found-icecream", {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(".drip-1", {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.2,
      });
      gsap.to(".drip-2", {
        y: 10,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.4,
      });
      gsap.to(".drip-3", {
        y: 6,
        duration: 1.3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.6,
      });

      const stars = document.querySelectorAll(".star");
      stars.forEach((star, i) => {
        gsap.to(star, {
          opacity: Math.random() * 0.5 + 0.3,
          duration: Math.random() * 1 + 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 2,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[100vh] flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFF5E6 0%, #FFE4C4 50%, #FFCBA4 100%)",
        minHeight: "100vh"
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="star absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              backgroundColor: ["#F19803", "#Eeba53", "#FFF"][i % 3],
              borderRadius: "50%",
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      <div ref={iceCreamRef} className="not-found-icecream relative z-10 mb-8">
        <svg
          width="200"
          height="280"
          viewBox="0 0 200 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="100" cy="70" rx="45" ry="40" fill="#F8DD94" />
          <ellipse cx="100" cy="65" rx="40" ry="35" fill="#FFF5E6" />
          <ellipse cx="100" cy="65" rx="35" ry="30" fill="#FFE4C4" />
          <circle cx="100" cy="50" r="8" fill="#F19803" />
          <circle cx="80" cy="55" r="5" fill="#Eeba53" />
          <circle cx="115" cy="52" r="6" fill="#D2986E" />

          <path
            d="M60 95 C60 70, 70 60, 100 60 C130 60, 140 70, 140 95"
            fill="#E9C4AB"
            stroke="#3A2313"
            strokeWidth="2"
          />
          <ellipse cx="100" cy="95" rx="40" ry="20" fill="#FFF5E6" />
          <ellipse cx="100" cy="90" rx="35" ry="15" fill="#FFE4C4" />

          <path
            className="drip-1"
            d="M70 110 C70 115, 72 130, 70 140 C68 130, 66 115, 70 110"
            fill="#FFF5E6"
            stroke="#E9C4AB"
            strokeWidth="1"
          />
          <path
            className="drip-2"
            d="M100 105 C100 112, 102 135, 100 150 C98 135, 96 112, 100 105"
            fill="#FFE4C4"
            stroke="#E9C4AB"
            strokeWidth="1"
          />
          <path
            className="drip-3"
            d="M130 108 C130 114, 132 128, 130 138 C128 128, 126 114, 130 108"
            fill="#FFF5E6"
            stroke="#E9C4AB"
            strokeWidth="1"
          />

          <rect x="85" y="155" width="30" height="80" rx="8" fill="#E9C4AB" />
          <rect x="90" y="160" width="20" height="70" rx="5" fill="#FFF5E6" />

          <path d="M65 235 L75 270" stroke="#3A2313" strokeWidth="4" strokeLinecap="round" />
          <path d="M100 235 L100 275" stroke="#3A2313" strokeWidth="4" strokeLinecap="round" />
          <path d="M135 235 L125 270" stroke="#3A2313" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>

      <div ref={textRef} className="not-found-text text-center z-10 px-4">
        <h1
          className="text-8xl font-bold mb-4"
          style={{
            fontFamily: "var(--font-pacifico)",
            color: "#3A2313",
          }}
        >
          Oops!
        </h1>
        <p
          className="not-found-subtext text-2xl md:text-3xl mb-2"
          style={{
            fontFamily: "var(--font-montserrat)",
            color: "#3A2313",
          }}
        >
          This page melted away
        </p>
        <p
          className="not-found-subtext text-lg mb-8"
          style={{
            fontFamily: "var(--font-josefin-sans)",
            color: "#B8784B",
          }}
        >
          Looks like this scoop got lost in the freezer
        </p>
      </div>

      <div ref={buttonRef} className="not-found-button z-10 pb-30">
        <Button href="/" variant="primary" size="sm">
          Back to Home
        </Button>

      </div>
    </div>
  );
}
