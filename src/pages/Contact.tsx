import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageSchema, type MessageInput } from '@utils/validation';
import { messagesAPI } from '@services/api';
import { Button } from '@components/ui/Button';
import { Input, Textarea } from '@components/ui/Input';
import Swal from 'sweetalert2';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageInput>({
    resolver: zodResolver(MessageSchema),
  });

  const onSubmit = async (data: MessageInput) => {
    if (data.honeypot) return;

    setIsSubmitting(true);
    try {
      await messagesAPI.create({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });

      await Swal.fire({
        title: 'Succès!',
        text: 'Votre message a été envoyé avec succès',
        icon: 'success',
        confirmButtonColor: '#1e40af',
      });

      reset();
    } catch (error) {
      await Swal.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'envoi du message',
        icon: 'error',
        confirmButtonColor: '#1e40af',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Me Contacter</h1>
        <p className="text-gray-600 mb-12">
          Vous avez un projet en tête? N'hésitez pas à me contacter
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input type="text" {...register('honeypot')} style={{ display: 'none' }} />

          <Input
            label="Nom"
            placeholder="Votre nom"
            {...register('name')}
            error={errors.name?.message}
          />

          <Input
            label="Email"
            type="email"
            placeholder="votre@email.com"
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            label="Sujet"
            placeholder="Sujet du message"
            {...register('subject')}
            error={errors.subject?.message}
          />

          <Textarea
            label="Message"
            placeholder="Votre message..."
            rows={6}
            {...register('message')}
            error={errors.message?.message}
          />

          <Button type="submit" size="lg" isLoading={isSubmitting}>
            Envoyer le message
          </Button>
        </form>
      </div>
    </div>
  );
}
