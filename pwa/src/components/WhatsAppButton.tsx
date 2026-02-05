import { MessageCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const WhatsAppButton = () => {
  const { currentSpace } = useAuth();

  const handleWhatsAppClick = () => {
    const phoneNumber = currentSpace?.whatsapp_soporte;
    
    if (!phoneNumber) {
      alert('No hay número de WhatsApp configurado para este espacio. Contactá al administrador del programa.');
      return;
    }

    // Mensaje predefinido
    const message = encodeURIComponent(
      `Hola! Soy ${currentSpace.space_name} y necesito asistencia con la app SISOC.`
    );
    
    // Abrir WhatsApp Web o App según dispositivo
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // No mostrar el botón si no hay número configurado (para MVP)
  // En producción podrías mostrarlo siempre con un mensaje genérico
  if (!currentSpace?.whatsapp_soporte) {
    return null;
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 active:scale-95 z-50"
      title="Contactar por WhatsApp"
      aria-label="Contactar soporte por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" strokeWidth={2} fill="currentColor" />
    </button>
  );
};

export default WhatsAppButton;
