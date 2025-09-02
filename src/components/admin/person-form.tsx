
"use client"

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPerson, updatePerson } from "@/lib/firebase-service";
import type { Person } from "@/lib/types";
import { PlusCircle, Trash2 } from "lucide-react";

// Helper to create a slug from a name
const createSlug = (name: string) => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove invalid chars
        .replace(/\s+/g, '-')           // collapse whitespace and replace by -
        .replace(/-+/g, '-');          // collapse dashes
};

const formSchema = z.object({
  name: z.string().min(2, "Аты-жөні кемінде 2 таңбадан тұруы керек."),
  biography: z.string().min(20, "Өмірбаяны кемінде 20 таңбадан тұруы керек."),
  imageUrls: z.array(z.object({ value: z.string().url("Жарамсыз URL мекенжайы.") })),
});

type PersonFormValues = z.infer<typeof formSchema>;

interface PersonFormProps {
  person?: Person;
}

export function PersonForm({ person }: PersonFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const isEditMode = !!person;

    const form = useForm<PersonFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: person?.name ?? "",
            biography: person?.biography ?? "",
            imageUrls: person?.imageUrls?.map(url => ({ value: url })) ?? [{ value: "" }],
        },
    });
    
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "imageUrls"
    });

    const onSubmit = async (data: PersonFormValues) => {
        const slug = createSlug(data.name);
        const imageUrls = data.imageUrls.map(item => item.value).filter(Boolean); // Filter out empty strings
        
        const personData = {
            ...data,
            slug,
            imageUrls,
        };

        let result;
        if (isEditMode && person.id) {
            result = await updatePerson(person.id, personData);
        } else {
            result = await createPerson(personData);
        }

        if (result.success) {
            toast({
                title: isEditMode ? "Сәтті жаңартылды" : "Сәтті жасалды",
                description: `${data.name} профилі ${isEditMode ? 'жаңартылды' : 'жасалды'}.`,
            });
            router.push("/admin/people");
        } else {
            toast({
                title: "Қате пайда болды",
                description: result.error,
                variant: "destructive",
            });
        }
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
                <div>
                  <FormLabel>Суреттер URL</FormLabel>
                  <FormDescription>Тұлғаның суреттеріне сілтемелер.</FormDescription>
                  <div className="space-y-2 mt-2">
                  {fields.map((field, index) => (
                    <FormField
                        key={field.id}
                        control={form.control}
                        name={`imageUrls.${index}.value`}
                        render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center gap-2">
                                <FormControl>
                                    <Input placeholder="https://example.com/image.jpg" {...field} />
                                </FormControl>
                                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                  ))}
                  </div>
                   <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => append({ value: "" })}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Сурет қосу
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
                 <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Сақталуда...' : (isEditMode ? 'Сақтау' : 'Қосу')}
                </Button>
                 <Button type="button" variant="outline" onClick={() => router.back()} className="ml-2">Болдырмау</Button>
            </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
