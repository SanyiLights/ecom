export const openWhatsApp = () => {
    const phoneNumber = "5491171388885";
    const message = "Hola! Me interesa conocer más sobre sus productos de iluminación profesional.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };