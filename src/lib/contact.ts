export const openWhatsApp = () => {
  const phoneNumber = "5491171388885";
  const message = "Hola! Me interesa conocer más sobre sus productos de iluminación profesional.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

export const openWhatsAppForModel = (model: string) => {
  const phoneNumber = "5491171388885";
  const message = `Hola! Quisiera cotizar el modelo: ${model}`;
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

export const openWhatsAppForModels = (models: string[]) => {
  const phoneNumber = "5491171388885";
  const pretty = models.map((m, i) => `${i + 1}. ${m}`).join("\n");
  const message = `Hola! Quisiera cotizar los siguientes modelos:\n\n${pretty}`;
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};