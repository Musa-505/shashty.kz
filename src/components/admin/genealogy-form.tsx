
"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createGenealogyMember, updateGenealogyMember } from "@/lib/firebase-service";
import type { GenealogyMember } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2, "Аты-жөні кемінде 2 таңбадан тұруы керек."),
  parentId: z.string().nullable(),
});

type GenealogyFormValues = z.infer<typeof formSchema>;

interface GenealogyFormProps {
  member?: GenealogyMember;
  allMembers: GenealogyMember[];
}

export function GenealogyForm({ member, allMembers }: GenealogyFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const isEditMode = !!member;

    const form = useForm<GenealogyFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: member?.name ?? "",
            parentId: member?.parentId ?? null,
        },
    });

    const onSubmit = async (data: GenealogyFormValues) => {
        const memberData = {
          name: data.name,
          // Handle the special 'root' value
          parentId: data.parentId === 'root' ? null : data.parentId,
        };

        let result;
        if (isEditMode && member.id) {
            result = await updateGenealogyMember(member.id, memberData);
        } else {
            result = await createGenealogyMember(memberData);
        }

        if (result.success) {
            toast({
                title: isEditMode ? "Сәтті жаңартылды" : "Сәтті қосылды",
                description: `${data.name} есімі шежіреге ${isEditMode ? 'жаңартылды' : 'қосылды'}.`,
            });
            router.push("/admin/genealogy");
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
                <CardTitle>Шежіре мүшесі туралы ақпарат</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Аты-жөні</FormLabel>
                            <FormControl>
                                <Input placeholder="Мысалы, Қабанбай батыр" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                  control={form.control}
                  name="parentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ата-тегі (әкесі)</FormLabel>
                      {/* Use 'root' as the value for the placeholder/null option */}
                      <Select onValueChange={field.onChange} defaultValue={field.value || "root"}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Түпкі ата ретінде сақтау үшін бос қалдырыңыз" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="root">Түпкі ата (әкесі жоқ)</SelectItem>
                          {allMembers.map(parent => (
                              <SelectItem key={parent.id} value={parent.id}>{parent.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
