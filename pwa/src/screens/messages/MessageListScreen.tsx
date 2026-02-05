import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Calendar, Loader, Bell } from 'lucide-react';
import { mockMessages } from '@/services/mockData';
import type { Message } from '@/services/mockData';

const MessageListScreen = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 500);
  }, []);

  const handleMessageClick = (msgId: string) => {
    navigate(`/mensajes/${msgId}`);
  };

  const unreadCount = messages.filter(m => !m.leido).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-border rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-text" strokeWidth={1.5} />
              </button>
              <h1 className="text-xl font-semibold text-text">Mensajes</h1>
            </div>
            {unreadCount > 0 && (
              <span className="flex items-center space-x-1 px-3 py-1 bg-cyan-500/10 text-cyan-600 border border-cyan-500 rounded-full text-sm font-medium">
                <Bell className="w-4 h-4" strokeWidth={1.5} />
                <span>{unreadCount} sin leer</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 text-cyan-600 animate-spin" strokeWidth={1.5} />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-16 h-16 text-text-muted mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-text-muted text-lg mb-2">No hay mensajes por ahora</p>
            <p className="text-sm text-text-muted">Te notificaremos cuando llegue algo nuevo</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => handleMessageClick(msg.id)}
                className={`w-full bg-surface hover:bg-border/50 border rounded-xl p-4 text-left transition-all ${
                  !msg.leido ? 'border-cyan-500' : 'border-border'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`${
                    !msg.leido 
                      ? 'bg-cyan-500/10 border-2 border-cyan-500' 
                      : 'bg-gray-500/10 border-2 border-gray-500'
                  } w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Mail className={`w-6 h-6 ${!msg.leido ? 'text-cyan-600' : 'text-gray-600'}`} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`text-base font-semibold ${!msg.leido ? 'text-text' : 'text-text-muted'}`}>
                        {msg.titulo}
                      </h3>
                      {!msg.leido && (
                        <span className="ml-2 w-2 h-2 bg-cyan-600 rounded-full flex-shrink-0 mt-1.5"></span>
                      )}
                    </div>
                    <p className="text-sm text-text-muted line-clamp-2 mb-2">
                      {msg.contenido}
                    </p>
                    <div className="flex items-center space-x-1 text-xs text-text-muted">
                      <Calendar className="w-3 h-3" strokeWidth={1.5} />
                      <span>{new Date(msg.fecha).toLocaleDateString('es-AR')}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MessageListScreen;
