
"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, "Аты-жөні кемінде 2 таңбадан тұруы керек."),
  title: z.string().min(2, "Атағы кемінде 2 таңбадан тұруы керек."),
  summary: z.string().min(10, "Қысқаша мазмұны кемінде 10 таңбадан тұруы керек."),
  biography: z.string().min(20, "Өмірбаяны кемінде 20 таңбадан тұруы керек."),
  contributions: z.string().min(10, "Үлестері кемінде 10 таңбадан тұруы керек."),
  imageUrl: z.string().url("Жарамсыз URL мекенжайы."),
  imageHint: z.string().optional(),
});

type PersonFormValues = z.infer<typeof formSchema>;

interface PersonFormProps {
  person?: {
    slug: string;
    name: string;
    title: string;
    summary: string;
    biography: string;
    contributions: string[];
    imageUrl: string;
    imageHint?: string;
  };
}


export function PersonForm({ person }: PersonFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const isEditMode = !!person;

    const form = useForm<PersonFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: person?.name ?? "",
            title: person?.title ?? "",
            summary: person?.summary ?? "",
            biography: person?.biography ?? "",
            contributions: person?.contributions.join("\n") ?? "",
            imageUrl: person?.imageUrl ?? "https://picsum.photos/400/400",
            imageHint: person?.imageHint ?? ""
        },
    });

    const onSubmit = (data: PersonFormValues) => {
        // In a real application, you would handle form submission here,
        // e.g., send data to your API to create/update a person.
        console.log("Form submitted with data:", data);

        toast({
            title: isEditMode ? "Сәтті жаңартылды" : "Сәтті жасалды",
            description: `${data.name} профилі ${isEditMode ? 'жаңартылды' : 'жасалды'}.`,
        });

        // Redirect back to the people list page
        router.push("/admin/people");
    };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Тұлға туралы ақпарат</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Аты-жөні</FormLabel>
                            <FormControl>
                                <Input placeholder="Мысалы, Абай Құнанбайұлы" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Атағы</FormLabel>
                            <FormControl>
                                <Input placeholder="Мысалы, Ақын, сазгер, философ" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Қысқаша мазмұны</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Тұлға туралы қысқаша сипаттама" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="biography"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Өмірбаяны</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Толық өмірбаяны" className="min-h-[150px]" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contributions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Негізгі үлестері</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Әр үлесті жаңа жолдан енгізіңіз" className="min-h-[100px]" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Сурет URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="imageHint"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Суретке AI кеңесі</FormLabel>
                            <FormControl>
                                <Input placeholder="Мысалы, historical portrait" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
            <CardFooter>
                 <Button type="submit">{isEditMode ? 'Сақтау' : 'Қосу'}</Button>
                 <Button type="button" variant="outline" onClick={() => router.back()} className="ml-2">Болдырмау</Button>
            </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

