import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { CloudRain } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';

export function Invite() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: (email: string) => api.post('/users/request-invite', { email }),
    onSuccess: () => setSuccess(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      mutation.mutate(email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534088568595-a066f410cbda?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
      
      <Card className="w-full max-w-md relative z-10">
        <CardHeader className="text-center">
          <div className="mx-auto bg-white/10 p-3 rounded-full w-fit mb-4">
            <CloudRain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">AI47Labs</h1>
          <CardDescription>Request access to the exclusive weather alert system.</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center py-6">
              <p className="text-green-400 font-medium mb-2">Request Submitted!</p>
              <p className="text-white/60 text-sm">We'll review your request and you'll be granted access soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                error={mutation.error ? 'Email already registered or invalid.' : undefined}
              />
              <Button type="submit" className="w-full" isLoading={mutation.isPending}>
                Request Access
              </Button>
            </form>
          )}
          <div className="mt-6 text-center text-xs text-white/40">
            <a href="/login" className="hover:text-white transition-colors">Admin Login</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
