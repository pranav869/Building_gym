"use client";

import { useEffect } from "react";

export default function MagneticEffects() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));

    const cleanups = elements.map((el) => {
      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
      };

      const leave = () => {
        el.style.transform = "translate3d(0, 0, 0)";
      };

      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);

      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
