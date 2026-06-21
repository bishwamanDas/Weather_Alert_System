import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LogOut, Check, X, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users').then((res) => res.data),
  });

  const { data: alerts = [], isLoading: alertsLoading } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => api.get('/alerts').then((res) => res.data),
    refetchInterval: 10000,
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.patch(`/users/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const clearAlerts = useMutation({
    mutationFn: () => api.delete('/alerts'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const pendingUsers = users.filter((u: any) => u.status === 'PENDING');
  const approvedUsers = users.filter((u: any) => u.status === 'APPROVED');

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex justify-between items-center mb-8 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">AI47Labs Weather Dashboard</h1>
            <p className="text-white/60 text-sm">Welcome back, Tony</p>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-white/80 hover:text-white">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>Users waiting for approval</CardDescription>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="text-white/50 text-sm">Loading...</div>
                ) : pendingUsers.length === 0 ? (
                  <div className="text-white/50 text-sm py-4 text-center">No pending requests</div>
                ) : (
                  <ul className="space-y-3">
                    {pendingUsers.map((u: any) => (
                      <li key={u.id} className="flex justify-between items-center bg-white/5 border border-white/10 p-3 rounded-lg">
                        <span className="text-sm font-medium">{u.email}</span>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => updateStatus.mutate({ id: u.id, status: 'APPROVED' })} className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/20">
                            <Check className="w-4 h-4 mr-1" /> Approve
                          </Button>
                          <Button size="sm" onClick={() => updateStatus.mutate({ id: u.id, status: 'REJECTED' })} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20">
                            <X className="w-4 h-4 mr-1" /> Reject
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Approved Users</CardTitle>
                <CardDescription>Users receiving weather alerts</CardDescription>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="text-white/50 text-sm">Loading...</div>
                ) : approvedUsers.length === 0 ? (
                  <div className="text-white/50 text-sm py-4 text-center">No approved users</div>
                ) : (
                  <ul className="space-y-3">
                    {approvedUsers.map((u: any) => (
                      <li key={u.id} className="flex justify-between items-center bg-white/5 border border-white/10 p-3 rounded-lg">
                        <span className="text-sm font-medium">{u.email}</span>
                        <span className="text-xs text-black font-semibold uppercase px-2 py-1 bg-white rounded">Active</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="h-full border-blue-500/20 bg-gradient-to-b from-blue-500/5 to-transparent">
              <CardHeader>
                <div className="flex justify-between items-center w-full">
                  <div className="space-y-1.5">
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-blue-400" />
                      Recent Alerts
                    </CardTitle>
                    <CardDescription>Live weather alerts</CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => clearAlerts.mutate()} 
                    disabled={clearAlerts.isPending || alerts.length === 0} 
                    className="text-white/40 hover:text-white"
                  >
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {alertsLoading ? (
                  <div className="text-white/50 text-sm">Loading alerts...</div>
                ) : alerts.length === 0 ? (
                  <div className="text-white/50 text-sm py-4 text-center">No alerts generated yet</div>
                ) : (
                  <ul className="space-y-3">
                    {alerts.map((a: any) => (
                      <li key={a.id} className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col gap-1">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium text-white">{a.message}</span>
                          <span className="text-xs text-white/40">{new Date(a.createdAt).toLocaleTimeString()}</span>
                        </div>
                        <span className="text-xs text-white/50">For: {a.user?.email}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
