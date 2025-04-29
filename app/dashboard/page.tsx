'use client';

import { useData } from '@/hooks/useData';
import { User } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Dashboard() {
  const { data: user, loading, error } = useData<User>('/api/user');

  if (loading) return <div>Loading...</div>;
  if (!user || error) return (location.href = '/');

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Card className="text-center">
        <CardHeader>
          <CardTitle>{user.email}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p>Opprettet: {user.created}</p>
            <p>Sist logget inn: {user.lastLoggedIn}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
