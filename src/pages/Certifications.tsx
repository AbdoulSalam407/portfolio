import { useState, useEffect } from 'react';
import { Card, CardContent } from '@components/ui/Card';
import { certificationsAPI } from '@services/api';
import type { Certification } from '../types';

export function Certifications() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      const response = await certificationsAPI.getAll();
      
      // Gérer le format de réponse paginée
      let certsData: any = response.data;
      if (certsData.results && Array.isArray(certsData.results)) {
        certsData = certsData.results;
      } else if (!Array.isArray(certsData)) {
        certsData = [];
      }
      
      setCerts(certsData);
    } catch (error) {
      console.error('Erreur lors du chargement des attestations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des attestations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Attestations & Certifications</h1>
        <p className="text-gray-600 mb-8 sm:mb-12 text-base sm:text-lg">Mes certifications professionnelles et formations</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {certs.map((cert) => (
            <Card key={cert.id} hover>
              <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden rounded-t-lg flex items-center justify-center">
                {cert.image && cert.image.trim() && (cert.image.startsWith('data:') || cert.image.startsWith('http')) ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement?.classList.add('flex', 'items-center', 'justify-center');
                    }}
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-700 mb-2">📜</div>
                    <p className="text-sm text-primary-600 px-2">{cert.title}</p>
                  </div>
                )}
              </div>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                <p className="text-primary-700 font-medium mb-2">{cert.issuer}</p>
                <p className="text-sm text-gray-600 mb-4">
                  Émis le {new Date(cert.issueDate).toLocaleDateString('fr-FR')}
                </p>

                {cert.skills && cert.skills.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Compétences:</p>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-700 hover:text-primary-800 font-medium text-sm"
                  >
                    Voir la certification →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {certs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Aucune certification trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}
