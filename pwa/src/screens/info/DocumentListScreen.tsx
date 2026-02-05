import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Calendar, Loader } from 'lucide-react';
import { mockDocuments } from '@/services/mockData';
import type { Document } from '@/services/mockData';

const DocumentListScreen = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setDocuments(mockDocuments);
      setLoading(false);
    }, 500);
  }, []);

  const handleDocumentClick = (docId: string) => {
    navigate(`/documentos/${docId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-border rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-text" strokeWidth={1.5} />
            </button>
            <h1 className="text-xl font-semibold text-text">Documentos</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 text-blue-600 animate-spin" strokeWidth={1.5} />
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-text-muted mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-text-muted text-lg">No hay documentos disponibles</p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => handleDocumentClick(doc.id)}
                className="w-full bg-surface hover:bg-border/50 border border-border rounded-xl p-4 text-left transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500/10 border-2 border-blue-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-text mb-1">
                      {doc.titulo}
                    </h3>
                    <div className="flex items-center space-x-3 text-sm text-text-muted">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" strokeWidth={1.5} />
                        <span>{new Date(doc.fecha).toLocaleDateString('es-AR')}</span>
                      </span>
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 rounded text-xs font-medium">
                        {doc.tipo}
                      </span>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-text-muted flex-shrink-0" strokeWidth={1.5} />
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DocumentListScreen;
