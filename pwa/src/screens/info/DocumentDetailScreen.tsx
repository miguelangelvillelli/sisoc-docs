import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Calendar, FileText, Loader, Share2 } from 'lucide-react';
import { mockDocuments } from '@/services/mockData';
import type { Document } from '@/services/mockData';

const DocumentDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const doc = mockDocuments.find(d => d.id === id);
      setDocument(doc || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleDownload = () => {
    alert('Descargando documento...');
  };

  const handleShare = () => {
    alert('Compartiendo documento...');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" strokeWidth={1.5} />
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-text-muted mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-text-muted">Documento no encontrado</p>
          <button
            onClick={() => navigate('/documentos')}
            className="mt-4 text-blue-600 hover:underline"
          >
            Volver a documentos
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
              onClick={() => navigate('/documentos')}
              className="p-2 hover:bg-border rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-text" strokeWidth={1.5} />
            </button>
            <h1 className="text-xl font-semibold text-text">Documento</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Información del documento */}
        <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-blue-500/10 border-2 border-blue-500 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-7 h-7 text-blue-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-text mb-2">
                {document.titulo}
              </h2>
              <div className="flex items-center space-x-3 text-sm text-text-muted">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  <span>{new Date(document.fecha).toLocaleDateString('es-AR')}</span>
                </span>
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 rounded text-xs font-medium">
                  {document.tipo}
                </span>
              </div>
            </div>
          </div>

          {/* Vista previa */}
          <div className="bg-background border border-border rounded-xl p-8 text-center mb-6">
            <FileText className="w-20 h-20 text-text-muted mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-text-muted mb-2">Vista previa no disponible</p>
            <p className="text-sm text-text-muted">Descargá el archivo para verlo</p>
          </div>

          {/* Acciones */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors font-medium"
            >
              <Download className="w-5 h-5" strokeWidth={1.5} />
              <span>Descargar</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center space-x-2 bg-surface hover:bg-border border border-border text-text px-4 py-3 rounded-lg transition-colors font-medium"
            >
              <Share2 className="w-5 h-5" strokeWidth={1.5} />
              <span>Compartir</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentDetailScreen;
