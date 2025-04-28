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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      pass: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(
        'http://auth-service.localhostdev:8080/api/auth',
        {
          method: 'POST',
          body: JSON.stringify({ email: values.email, pass: values.pass }),
        },
      );

      const { token } = (await res.json()) as {
        returnUrl: string;
        token: string;
      };

      console.log(token);
    } catch (e) {
      console.log(e);
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
        <Button type="submit" className="w-full">
          Logg inn
        </Button>
      </form>
    </Form>
  );
}
