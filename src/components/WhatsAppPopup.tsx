"use client";

const WHATSAPP_URL =
  "https://wa.me/918838250227?text=Hi%20Smile%20Elite%20Dental%2C%20I%20would%20like%20to%20book%20a%20consultation.";

export default function WhatsAppPopup() {
  return (
    <div className="fixed z-[90] right-5 bottom-24 md:bottom-6">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_14px_35px_rgba(37,211,102,0.45)] ring-1 ring-white/20 hover:scale-105 transition-transform"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.84 11.84 0 0 0 12.02 0C5.4 0 .02 5.38.02 12c0 2.12.55 4.2 1.6 6.03L0 24l6.13-1.6A11.95 11.95 0 0 0 12.02 24C18.64 24 24 18.62 24 12c0-3.2-1.24-6.2-3.48-8.52zm-8.5 18.5a9.94 9.94 0 0 1-5.07-1.4l-.36-.2-3.64.95.97-3.55-.24-.37A9.97 9.97 0 1 1 12.02 22z" />
          <path d="M17.76 14.44c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47a8.9 8.9 0 0 1-1.67-2.07c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.88 1.23 3.07.15.2 2.12 3.23 5.13 4.53.72.3 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
        </svg>
      </a>
    </div>
  );
}
