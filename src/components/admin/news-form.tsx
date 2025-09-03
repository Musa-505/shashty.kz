
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
import { createNewsItem, updateNewsItem } from "@/lib/firebase-service";
import type { News } from "@/lib/types";
import { PlusCircle, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const createSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

const formSchema = z.object({
  title: z.string().min(5, "Тақырып кемінде 5 таңбадан тұруы керек."),
  category: z.string().min(2, "Категория кемінде 2 таңбадан тұруы керек."),
  date: z.date({
    required_error: "Күнін таңдау қажет.",
  }),
  summary: z.string().min(10, "Қысқаша мазмұны кемінде 10 таңбадан тұруы керек."),
  content: z.string().min(20, "Мазмұны кемінде 20 таңбадан тұруы керек."),
  imageUrls: z.array(z.object({ value: z.string().url("Жарамсыз URL мекенжайы.") })),
  imageHint: z.string().optional(),
});

type NewsFormValues = z.infer<typeof formSchema>;

interface NewsFormProps {
  newsItem?: News;
}

export function NewsForm({ newsItem }: NewsFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const isEditMode = !!newsItem;

    const form = useForm<NewsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: newsItem?.title ?? "",
            category: newsItem?.category ?? "",
            date: newsItem?.date ? new Date(newsItem.date) : new Date(),
            summary: newsItem?.summary ?? "",
            content: newsItem?.content ?? "",
            imageUrls: newsItem?.imageUrls?.map(url => ({ value: url })) ?? [{ value: "" }],
            imageHint: newsItem?.imageHint ?? "",
        },
    });
    
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "imageUrls"
    });

    const onSubmit = async (data: NewsFormValues) => {
        const slug = createSlug(data.title);
        const imageUrls = data.imageUrls.map(item => item.value).filter(Boolean);
        
        const newsData = {
            ...data,
            slug,
            imageUrls,
            date: format(data.date, "yyyy-MM-dd"),
        };

        let result;
        if (isEditMode && newsItem.id) {
            result = await updateNewsItem(newsItem.id, newsData);
        } else {
            result = await createNewsItem(newsData);
        }

        if (result.success) {
            toast({
                title: isEditMode ? "Сәтті жаңартылды" : "Сәтті жасалды",
                description: `${data.title} жаңалығы ${isEditMode ? 'жаңартылды' : 'жасалды'}.`,
            });
            router.push("/admin/news");
            router.refresh();
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
                <CardTitle>Жаңалық туралы ақпарат</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Тақырыбы</FormLabel>
                            <FormControl>
                                <Input placeholder="Жаңалық тақырыбы" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Категориясы</FormLabel>
                                <FormControl>
                                    <Input placeholder="Мысалы: Мәдениет" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Жарияланған күні</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Күнді таңдаңыз</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </div>
                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Қысқаша мазмұны</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Жаңалықтың қысқаша мазмұны" className="min-h-[100px]" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Толық мазмұны</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Жаңалықтың толық мәтіні" className="min-h-[250px]" {...field} />
                            </FormControl>
                             <FormDescription>Жаңа абзацты Enter арқылы қосыңыз.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                  <FormLabel>Суреттер URL</FormLabel>
                  <FormDescription>Жаңалық суреттеріне сілтемелер.</FormDescription>
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
                                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields.length === 1}>
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
                 <FormField
                    control={form.control}
                    name="imageHint"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>AI сурет іздеуге арналған кілт сөздер</FormLabel>
                            <FormControl>
                                <Input placeholder="Мысалы: important event" {...field} />
                            </FormControl>
                             <FormDescription>AI суретші үшін ағылшын тілінде 1-2 сөзбен суретті сипаттаңыз.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
