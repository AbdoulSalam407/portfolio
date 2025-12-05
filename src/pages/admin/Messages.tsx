import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, Mail, MailOpen } from 'lucide-react';
import { Button } from '@components/ui/Button';
import { Card, CardContent } from '@components/ui/Card';
import { messagesAPI } from '@services/api';
import type { Message } from '@/types';
import Swal from 'sweetalert2';

export function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await messagesAPI.getAll();
      
      // Gérer le format de réponse paginée
      let messagesData: any = response.data;
      if (messagesData.results && Array.isArray(messagesData.results)) {
        messagesData = messagesData.results;
      } else if (!Array.isArray(messagesData)) {
        messagesData = [];
      }
      
      setMessages(messagesData);
    } catch (error) {
      console.error('Erreur:', error);
      await Swal.fire('Erreur', 'Impossible de charger les messages', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Supprimer ce message?',
      text: 'Cette action est irréversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1e40af',
      cancelButtonColor: '#6b7280',
    });

    if (result.isConfirmed) {
      try {
        await messagesAPI.delete(id);
        setMessages(messages.filter(m => m.id !== id));
        setSelectedMessage(null);
        await Swal.fire('Supprimé!', 'Le message a été supprimé', 'success');
      } catch (error) {
        await Swal.fire('Erreur', 'Impossible de supprimer le message', 'error');
      }
    }
  };

  const handleMarkAsRead = async (message: Message) => {
    try {
      const updated = { ...message, read: !message.read };
      await messagesAPI.update(message.id, updated);
      setMessages(messages.map(m => m.id === message.id ? updated : m));
      setSelectedMessage(updated);
      await Swal.fire('Succès', message.read ? 'Marqué comme non lu' : 'Marqué comme lu', 'success');
    } catch (error) {
      await Swal.fire('Erreur', 'Impossible de mettre à jour le message', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-3xl font-bold">Messages Reçus</h1>
          <span className="ml-auto bg-primary-700 text-white px-3 py-1 rounded-full text-sm">
            {messages.length} message{messages.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {messages.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-600">
                    Aucun message
                  </CardContent>
                </Card>
              ) : (
                messages.map(message => (
                  <Card
                    key={message.id}
                    hover
                    className={`cursor-pointer ${selectedMessage?.id === message.id ? 'ring-2 ring-primary-700' : ''}`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-2">
                        {message.read ? (
                          <MailOpen size={18} className="text-gray-400 flex-shrink-0 mt-1" />
                        ) : (
                          <Mail size={18} className="text-primary-700 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-grow min-w-0">
                          <p className="font-semibold text-sm truncate">{message.name}</p>
                          <p className="text-xs text-gray-600 truncate">{message.subject}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(message.createdAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h3>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-semibold">{selectedMessage.name}</p>
                          <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(selectedMessage.createdAt).toLocaleString('fr-FR')}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedMessage.read 
                            ? 'bg-gray-100 text-gray-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {selectedMessage.read ? 'Lu' : 'Non lu'}
                        </span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>

                    <div className="border-t pt-4 flex gap-2">
                      <Button
                        variant={selectedMessage.read ? 'outline' : 'primary'}
                        onClick={() => handleMarkAsRead(selectedMessage)}
                      >
                        {selectedMessage.read ? 'Marquer comme non lu' : 'Marquer comme lu'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDelete(selectedMessage.id)}
                      >
                        <Trash2 size={18} className="mr-2 text-red-600" /> Supprimer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-gray-600">
                  Sélectionnez un message pour voir les détails
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
