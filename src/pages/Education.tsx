import { useState, useEffect } from 'react';
import { Card, CardContent } from '@components/ui/Card';
import { educationAPI } from '@services/api';
import type { Education } from '../types';

export function EducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {
      const response = await educationAPI.getAll();
      setEducation(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des formations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des formations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Formations</h1>
        <p className="text-gray-600 mb-12">Mon parcours éducatif et professionnel</p>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <div key={edu.id} className="relative">
              {index !== education.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-12 bg-primary-200"></div>
              )}

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-700 text-white font-bold">
                    {index + 1}
                  </div>
                </div>

                <Card className="flex-grow">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">{edu.degree}</h3>
                        <p className="text-primary-700 font-medium">{edu.school}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{edu.field}</p>
                    <p className="text-gray-600">{edu.description}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
