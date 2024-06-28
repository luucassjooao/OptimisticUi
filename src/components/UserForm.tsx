import { useCreateUser } from '@/app/hooks/useCreateUser';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import React, { useState } from 'react';
import { toast } from 'sonner';

export function UserForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const { createUser } = useCreateUser();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setName('');
      setUsername('');

      await createUser({
        name, username, blocked: false,
      });
    } catch {
      toast.error('Usuario nao cadastrado');
    }
  }

  return (
    <form onSubmit={handleSubmit} className='bg-muted/50 p-4 rounded-md' >
      <div className='flex gap-2'>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do usuario"
        />
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='@ no github'
        />

      </div>
      <Button className='mt-3 w-full'>
        Cadastrar
      </Button>
    </form>
  );
}
