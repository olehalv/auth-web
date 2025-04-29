'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchData } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Vennligst oppgi epost adressen din' })
    .email('Denne epost adressen ser ikke riktig ut'),
  pass: z
    .string()
    .min(1, { message: 'Vennligst oppgi passordet ditt' })
    .max(70, { message: 'Passord kan ikke være større enn 70 karakterer' }),
});

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      pass: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await fetchData('/api/auth', 'POST', {
      email: values.email,
      pass: values.pass,
    });

    if (res.error) {
      form.setError('root', { type: 'manual', message: res.error });
    } else {
      router.replace('/dashboard');
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Epost</FormLabel>
              <FormControl>
                <Input placeholder="ola@nordmann.no" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passord</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <FormMessage>{form.formState.errors.root.message}</FormMessage>
        )}
        <Button type="submit" className="w-full">
          Logg inn
        </Button>
      </form>
    </Form>
  );
}
