import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginForm from '@/components/login-form';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Logg inn</CardTitle>
          <CardDescription>
            Bruk e-post og passord, har du ikke opprettet bruker ennå men har
            blitt henvist hit? Registrer deg{' '}
            <Link href="#" className="underline">
              her
            </Link>
            .
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
