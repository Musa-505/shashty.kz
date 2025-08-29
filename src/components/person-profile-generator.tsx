
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateProfileAction } from '@/app/actions';
import type { GeneratePersonProfileOutput } from '@/ai/flows/generate-person-profile';
import { BrainCircuit, CheckCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Аты-жөні кемінде 3 таңбадан тұруы керек.',
  }),
  additionalContext: z.string().optional(),
});

export function PersonProfileGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<GeneratePersonProfileOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      additionalContext: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setProfile(null);

    const result = await generateProfileAction(values.name, values.additionalContext || '');
    
    if (result.error) {
      setError(result.error);
    } else {
      setProfile(result.data);
    }
    setLoading(false);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            Генератор
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тұлғаның аты-жөні</FormLabel>
                    <FormControl>
                      <Input placeholder="Мысалы, Абай Құнанбайұлы" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalContext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Қосымша контекст (міндетті емес)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Мысалы, оның қазақ әдебиетіне қосқан үлесіне назар аударыңыз"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Генерациялануда...' : 'Профильді генерациялау'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div>
        {loading && (
          <div className="flex flex-col items-center justify-center h-full space-y-4 p-8 rounded-lg border-2 border-dashed">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Профиль жасалуда... бұл біраз уақыт алуы мүмкін.</p>
          </div>
        )}
        {error && (
            <div className="flex flex-col items-center justify-center h-full p-8 rounded-lg bg-destructive/10 text-destructive">
                <p>{error}</p>
            </div>
        )}
        {profile && (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            <Card>
                <div className='relative h-64 w-full'>
                    <Image src="https://picsum.photos/800/400" alt="Generated profile image" fill data-ai-hint="portrait painting" className="object-cover rounded-t-lg" />
                </div>
              <CardHeader>
                <CardTitle className="font-headline text-3xl">{form.getValues('name')}</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <h3 className='font-headline'>Өмірбаяны</h3>
                <p>{profile.biography}</p>

                <h3 className='font-headline'>Негізгі деректер</h3>
                <ul className="space-y-2">
                  {profile.keyFacts.map((fact, index) => (
                    <li key={index} className="flex items-start">
                       <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                       <span>{fact}</span>
                    </li>
                  ))}
                </ul>

                <h3 className='font-headline'>Тарихи маңызы</h3>
                <p>{profile.historicalImportanceSummary}</p>
              </CardContent>
            </Card>
          </div>
        )}
        {!loading && !profile && !error && (
            <div className="flex flex-col items-center justify-center h-full space-y-4 p-8 rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground text-center">Жасалған профиль осы жерде пайда болады.</p>
            </div>
        )}
      </div>
    </div>
  );
}
