
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteGenealogyMember } from "@/lib/firebase-service";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteGenealogyMemberButton({ memberId }: { memberId: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    const result = await deleteGenealogyMember(memberId);
    if (result.success) {
      toast({
        title: "Сәтті жойылды",
        description: "Шежіре мүшесі жойылды.",
      });
      router.refresh();
    } else {
      toast({
        title: "Қате",
        description: result.error || "Тұлғаны жою кезінде қате пайда болды.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Жою</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Сіз сенімдісіз бе?</AlertDialogTitle>
          <AlertDialogDescription>
            Бұл әрекетті қайтару мүмкін емес. Бұл тұлғаны дерекқордан біржола жояды. Егер бұл тұлғаның ұрпақтары болса, оны жою мүмкін емес.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Болдырмау</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isSubmitting}>
            {isSubmitting ? "Жойылуда..." : "Жою"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
