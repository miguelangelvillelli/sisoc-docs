import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, Calendar, Loader } from 'lucide-react';
import { mockMessages } from '@/services/mockData';
import type { Message } from '@/services/mockData';

const MessageDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const msg = mockMessages.find(m => m.id === id);
      setMessage(msg || null);
      setLoading(false);
      
      // Marcar como leído
      if (msg && !msg.leido) {
        msg.leido = true;
      }
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="w-8 h-8 text-cyan-600 animate-spin" strokeWidth={1.5} />
      </div>
    );
  }

  if (!message) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Mail className="w-16 h-16 text-text-muted mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-text-muted">Mensaje no encontrado</p>
          <button
            onClick={() => navigate('/mensajes')}
            className="mt-4 text-cyan-600 hover:underline"
          >
            Volver a mensajes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/mensajes')}
              className="p-2 hover:bg-border rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-text" strokeWidth={1.5} />
            </button>
            <h1 className="text-xl font-semibold text-text">Mensaje</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-surface border border-border rounded-2xl p-6">
          {/* Header del mensaje */}
          <div className="flex items-start space-x-4 mb-6 pb-6 border-b border-border">
            <div className="bg-cyan-500/10 border-2 border-cyan-500 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-7 h-7 text-cyan-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-text mb-2">
                {message.titulo}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-text-muted">
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                <span>{new Date(message.fecha).toLocaleDateString('es-AR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="prose prose-sm max-w-none">
            <p className="text-text leading-relaxed whitespace-pre-wrap">
              {message.contenido}
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500 rounded-xl">
          <p className="text-sm text-cyan-600">
            <strong>ℹ️ Importante:</strong> Este mensaje proviene del programa SISOC. 
            Si tenés dudas, contactá a tu referente del programa.
          </p>
        </div>
      </main>
    </div>
  );
};

export default MessageDetailScreen;
